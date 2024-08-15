import crypto from "node:crypto";

export function hashUserInput(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  return storedPassword === suppliedPassword;
}
