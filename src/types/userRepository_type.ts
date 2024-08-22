import { UserDocs } from "../config/model/User";

// Define the types for the repository functions
type Create = (
  input: Partial<UserDocs>,
) => Promise<{ message: string }>;
type Login = (input: {
  email: string;
  password: string;
}) => Promise<{ accessToken: string; refreshToken: string }>;
type GrantTokens = (
  refreshToken: string,
) => Promise<
  { accessToken: string; refreshToken: string } | undefined
>;
type Find = (id: string) => Promise<UserDocs | null>;
type FindAll = () => Promise<UserDocs[]>;

export type UserRepositoryType = {
  create: Create;
  login: Login;
  find: Find;
  findAll: FindAll;
  grantTokens: GrantTokens;
};
