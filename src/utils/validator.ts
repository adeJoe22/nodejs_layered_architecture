import Ajv, { Schema } from "ajv";

const ajv = new Ajv({ allErrors: true });

export const validateRequest = <T>(
  requestBody: unknown,
  schema: Schema,
) => {
  const validateData = ajv.compile<T>(schema);

  if (validateData(requestBody)) {
    return false;
  }

  const errors = validateData.errors?.map((err) => {
    if (err.instancePath === "/email" && err.keyword === "pattern") {
      return "Email format is invalid.";
    }
    if (
      err.instancePath === "/password" &&
      err.keyword === "pattern"
    ) {
      return "Password must be at least 8 characters long, contain one letter, one number, and one special character.";
    }
    return `${err.instancePath.replace("/", "")} ${err.message}`;
  });

  return errors && errors[0];
};
