import dotenv from "dotenv";
dotenv.config();

export const envVariables = {
  port: process.env.PORT!,
  jwt: {
    secret: process.env.JWT_SECRET!,
    accessExpiration: process.env.ACCESS_TOKEN_EXPIRATION!,
    refreshExpiration: process.env.REFRESH_TOKEN_EXPIRATION!,
  },
};
