import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}));
