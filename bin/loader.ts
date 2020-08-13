import { config } from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "production") {
  throw new Error("You are not allowed to run this script in production");
}

config();
