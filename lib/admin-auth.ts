import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { createSupabaseAdminClient, createSupabaseServerClient } from "@/lib/supabase";

const ADMIN_SESSION_COOKIE = "ndtravels_admin_session";

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_SESSION_SECRET in your environment.");
  }

  return secret;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function buildSignature(payload: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(payload).digest("hex");
}

function parseSessionValue(value: string) {
  const firstSeparatorIndex = value.indexOf(".");
  const lastSeparatorIndex = value.lastIndexOf(".");

  if (firstSeparatorIndex <= 0 || lastSeparatorIndex <= firstSeparatorIndex) {
    return null;
  }

  return {
    userId: value.slice(0, firstSeparatorIndex),
    email: value.slice(firstSeparatorIndex + 1, lastSeparatorIndex),
    signature: value.slice(lastSeparatorIndex + 1)
  };
}

async function getActiveAdmin(userId: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function verifyAdminCredentials(email: string, password: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user?.id || !user.email) {
    return null;
  }

  const adminProfile = await getActiveAdmin(user.id);

  if (!adminProfile) {
    return null;
  }

  return {
    id: user.id,
    email: user.email
  };
}

export async function getAuthenticatedAdminEmail() {
  try {
    const admin = await getAuthenticatedAdmin();
    return admin?.email ?? null;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  return Boolean(await getAuthenticatedAdminEmail());
}

export async function getAuthenticatedAdmin() {
  try {
    const cookieStore = await cookies();
    const sessionValue = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!sessionValue) {
      return null;
    }

    const parsedValue = parseSessionValue(sessionValue);

    if (!parsedValue) {
      return null;
    }

    const payload = `${parsedValue.userId}.${parsedValue.email}`;

    if (!safeEqual(parsedValue.signature, buildSignature(payload))) {
      return null;
    }

    const admin = await getActiveAdmin(parsedValue.userId);

    if (!admin) {
      return null;
    }

    return {
      id: parsedValue.userId,
      email: parsedValue.email
    };
  } catch {
    return null;
  }
}

export async function createAdminSession(userId: string, email: string) {
  const cookieStore = await cookies();
  const normalizedUserId = userId.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const payload = `${normalizedUserId}.${normalizedEmail}`;
  const sessionValue = `${payload}.${buildSignature(payload)}`;

  cookieStore.set(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}
