import { UserRequestInput } from "../dto/userRequest";
import { UserRepositoryType } from "../types/userRepository_type";
import { logger } from "../utils/logger";

export const CreateUser = async (
  input: UserRequestInput,
  repo: UserRepositoryType,
) => {
  const data = await repo.create(input);
  logger.info(data);
  return data;
};
export const LoginUser = async (
  input: UserRequestInput,
  repo: UserRepositoryType,
) => {
  const data = await repo.login(input);
  logger.info(data);
  return data;
};

export const grantUserRefreshToken = async (
  refreshToken: string,
  repo: UserRepositoryType,
) => {
  const data = await repo.grantTokens(refreshToken);
  logger.info(data);
  return data;
};
export const GetUsers = async (repo: UserRepositoryType) => {
  const data = await repo.findAll();
  logger.info(data);
  return data;
};
export const GetUser = async (
  id: string,
  repo: UserRepositoryType,
) => {
  const data = await repo.find(id);
  logger.info(data);
  return data;
};
