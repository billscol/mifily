import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(
    password,
    salt,
    KEY_LENGTH,
  )) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPasswordHash(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;

  const derivedKey = (await scryptAsync(
    password,
    salt,
    KEY_LENGTH,
  )) as Buffer;
  const hashBuffer = Buffer.from(hash, "hex");

  return (
    derivedKey.length === hashBuffer.length &&
    timingSafeEqual(derivedKey, hashBuffer)
  );
}
