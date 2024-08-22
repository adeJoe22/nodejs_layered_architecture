import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import { httpLogger } from "./utils/logger";
import { HandleErrorWithLogger } from "./utils/error/handler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use(userRouter);
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "Health Check" });
});

app.use(HandleErrorWithLogger);

export default app;
