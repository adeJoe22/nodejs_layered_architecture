import { connect } from "mongoose";

const URL = "mongodb://127.0.0.1:27017/CA_test";
export const dbConnection = async () => {
  try {
    const conn = await connect(URL);
    console.log(
      `DB connection established on ${conn.connection.host}`,
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
