import * as Express from "express";
import { Request } from "express";
import formidable, { File } from "formidable";

declare module "express-serve-static-core" {
  interface Request {
    files: { [key: string]: File | File[] };
  }
}
