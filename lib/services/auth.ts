import { failure, success, type ApiResult } from "@/lib/api-schema";
import type { AuthProfile, LoginFormValues, RegisterFormValues } from "@/lib/contracts/auth";
import { clearPendingRoute, writeAuthSession } from "@/lib/services/authSession";

function buildSession(email: string, name: string): AuthProfile {
  return {
    authenticated: true,
    email,
    name,
  };
}

export async function submitLogin(values: LoginFormValues): Promise<ApiResult<AuthProfile>> {
  const email = values.email.trim();
  const password = values.password.trim();

  if (!email || !password) {
    return failure("validation_error", "Email và mật khẩu là bắt buộc.");
  }

  const session = buildSession(email, email.split("@")[0] || "User");

  writeAuthSession(session);
  clearPendingRoute();
  console.log("[auth] login submit", values);
  return success(session);
}

export async function submitRegister(values: RegisterFormValues): Promise<ApiResult<AuthProfile>> {
  const email = values.email.trim();
  const password = values.password.trim();
  const fullName = values.fullName.trim();

  if (!email || !password) {
    return failure("validation_error", "Email và mật khẩu là bắt buộc.");
  }

  if (!values.acceptedTerms) {
    return failure("validation_error", "Bạn cần đồng ý với điều khoản trước khi đăng ký.");
  }

  const session = buildSession(email, fullName || email.split("@")[0] || "User");

  writeAuthSession(session);
  clearPendingRoute();
  console.log("[auth] register submit", values);
  return success(session);
}
