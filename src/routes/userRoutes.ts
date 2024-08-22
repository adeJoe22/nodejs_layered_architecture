import express, {
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import * as service from "../service/userService";
import * as repository from "../repository/userRepository";
import { validateRequest } from "../utils/validator";
import {
  UserRequestInput,
  createUserRequestSchema,
} from "../dto/userRequest";

const userRouter = Router();
const repo = repository.UserRepository;

userRouter.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = validateRequest<UserRequestInput>(
        req.body,
        createUserRequestSchema,
      );
      if (error) {
        return res.status(404).json({ error });
      }
      const response = await service.CreateUser(req.body, repo);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
);

userRouter.post(
  "/login",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await service.LoginUser(req.body, repo);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
);

userRouter.get(
  "/refreshToken",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await service.grantUserRefreshToken(
        req.body.refreshToken,
        repo,
      );
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
);

userRouter.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await service.GetUsers(repo);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
);

userRouter.get(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await service.GetUser(req.params.id, repo);
      return res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  },
);

export default userRouter;
