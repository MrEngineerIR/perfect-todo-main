import crypto from "node:crypto";

export function hashUserInput(password: string) {
  //   const salt = crypto.randomBytes(16).toString("hex");

  //   const hashedPassword = crypto.scryptSync(password, salt, 64);
  //   return hashedPassword.toString("hex") + ":" + salt;
  return crypto.createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(
  storedPassword: string,
  suppliedPassword: string
) {
  return storedPassword === suppliedPassword;
  //   const [hashedPassword, salt] = storedPassword.split(":");
  //   const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
  //   const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
  //   return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
