import { envVariables } from "../config/envVariable";
import UserModel, { UserDocs } from "../config/model/User";
import { generateAuthTokens } from "../service/tokenService";
import { UserRepositoryType } from "../types/userRepository_type";
import {
  GenerateHash,
  GenerateSalt,
  ValidatePasswordOrToken,
  VerifySignature,
} from "../utils/auth";
import {
  APIError,
  AuthorizeError,
  NotFoundError,
} from "../utils/error";

const createUser: UserRepositoryType["create"] = async (input) => {
  try {
    const userExist = await UserModel.findOne({
      email: input.email!,
    });
    if (userExist !== null)
      throw new AuthorizeError("User email already taken!");
    const salt = await GenerateSalt();
    const hashedPassword = await GenerateHash(input.password!, salt);

    const user = new UserModel({
      ...input,
      password: hashedPassword,
      salt,
    });

    await user.save();
    return {
      message: "User created successfully",
    };
  } catch (error: any) {
    throw new APIError(error.message);
  }
};

const loginUser: UserRepositoryType["login"] = async (input) => {
  try {
    const user = await UserModel.findOne({ email: input.email });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isValidPassword = await ValidatePasswordOrToken(
      input.password,
      user.password,
      user.salt,
    );
    if (!isValidPassword) {
      throw new NotFoundError("Invalid password");
    }
    const { refresh, access } = await generateAuthTokens(user.id);
    if (!user.tokens) user.tokens = [refresh];
    else user.tokens.push(refresh);
    await user.save();
    return {
      accessToken: access,
      refreshToken: refresh,
    };
  } catch (error: any) {
    throw new Error("Error logging in: " + error.message);
  }
};

const grantUserTokens: UserRepositoryType["grantTokens"] = async (
  refreshToken,
) => {
  try {
    const payload = VerifySignature(
      refreshToken,
      envVariables.jwt.secret,
    );
    if (!payload) throw new AuthorizeError("Unauthorized request");

    const user = await UserModel.findOne({
      _id: payload.sub,
      tokens: refreshToken,
    });
    if (!user) {
      // User has been compromised, remove all tokens
      await UserModel.findByIdAndUpdate(payload.sub, { tokens: [] });
      throw new NotFoundError("User not found");
    }
    const { refresh, access } = await generateAuthTokens(user?.id);
    const filteredTokens = user.tokens.filter(
      (t) => t !== refreshToken,
    );
    user.tokens = filteredTokens;
    user.tokens.push(refresh);
    await user.save();

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  } catch (error: any) {
    throw new APIError(error.message);
  }
};
const findUser: UserRepositoryType["find"] = async (id) => {
  try {
    const user = await UserModel.findById(id, { tokens: 0, _id: 0 });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error: any) {
    throw new Error("Error finding user: " + error.message);
  }
};
const findUsers: UserRepositoryType["findAll"] = async () => {
  try {
    const users = await UserModel.find({}, { _id: 0, tokens: 0 });
    return users;
  } catch (error: any) {
    return error.message;
  }
};

export const UserRepository: UserRepositoryType = {
  create: createUser,
  login: loginUser,
  find: findUser,
  findAll: findUsers,
  grantTokens: grantUserTokens,
};
