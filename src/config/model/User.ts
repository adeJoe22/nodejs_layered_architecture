import { Document, Schema, model } from "mongoose";

export interface UserDocs extends Document {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  salt: string;
  verified: boolean;
  verificationToken: string;
  tokenSalt: string;
  createdAt: Date;
  tokens: string[];
}

const schema = new Schema<UserDocs>(
  {
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationToken: String,
    tokenSalt: String,
    createdAt: {
      type: Date,
      expires: 86400,
      default: Date.now(),
    },
    tokens: [String],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  },
);

const UserModel = model<UserDocs>("User", schema);
export default UserModel;
