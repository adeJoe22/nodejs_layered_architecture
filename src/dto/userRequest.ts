import { Static, Type } from "@sinclair/typebox";

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password validation
// At least one letter, one number, one special character, and at least 8 characters long
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const createUserRequestSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String({ pattern: emailRegex.source }),
  password: Type.String({ pattern: passwordRegex.source }),
});

export type UserRequestInput = Static<typeof createUserRequestSchema>;
