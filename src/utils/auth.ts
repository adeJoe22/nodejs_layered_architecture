import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AuthPayload = {
  _id: string;
  email: string;
};
export const GenerateSalt = async () => {
  return await bcrypt.genSalt(12);
};

export const GenerateHash = async (data: string, salt: string) => {
  return await bcrypt.hash(data, salt);
};

export const ValidatePasswordOrToken = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string,
) => {
  return (
    (await GenerateHash(enteredPassword, salt)) === savedPassword
  );
};


export const VerifySignature = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};
