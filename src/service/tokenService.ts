import dayjs, { Dayjs } from "dayjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../config/envVariable";

type TokenProps = {
  userID: string;
  expires: Dayjs;
  type: string;
  secret?: string;
};

const tokenTypes = {
  access: "accessToken",
  refresh: "refreshToken",
};

export const generateToken = ({
  userID,
  expires,
  type,
  secret = envVariables.jwt.secret,
}: TokenProps) => {
  const payload = {
    sub: userID,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  } as JwtPayload;
  return jwt.sign(payload, secret);
};

export const generateAuthTokens = async (userID: string) => {
  const accessTokenExpires = dayjs().add(
    Number(envVariables.jwt.accessExpiration),
    "minutes",
  );
  const accessToken = generateToken({
    userID,
    expires: accessTokenExpires,
    type: tokenTypes.access,
  });

  const refreshTokenExpires = dayjs().add(
    Number(envVariables.jwt.refreshExpiration),
    "days",
  );
  const refreshToken = generateToken({
    userID,
    expires: refreshTokenExpires,
    type: tokenTypes.refresh,
  });

  return {
    access: accessToken,
    refresh: refreshToken,
  };
};
