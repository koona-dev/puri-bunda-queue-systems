import "dotenv/config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";

export const encryptPassword = (password: string) => {
  return bcrypt.hashSync(password, 12);
};

export const comparePassword = (hashPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashPassword);
};

export const generateToken = (payload: string) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRandomString = (length = 128) => {
  // Generate enough random bytes, then slice to desired length
  return crypto
    .randomBytes(length)
    .toString("base64") // or "hex"
    .slice(0, length); // ensure max length
};

export const generateSha256Base64 = (data: string) => {
  let jsonStringHash256 = crypto
    .createHash("sha256")
    .update(data, "utf-8")
    .digest();

  let bufferFromJsonStringHash256 = Buffer.from(jsonStringHash256);
  return bufferFromJsonStringHash256.toString("base64");
};

export const generateHmacSha256Base64 = (
  data: { [key: string]: any },
  secret: string
) => {
  // Create an HMAC object using SHA256 algorithm and the secret key
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(data.toString())
    .digest();

  // Calculate the digest and encode it in Base64
  let bufferFromHmac256Value = Buffer.from(hmac);
  return bufferFromHmac256Value.toString("base64");
};
