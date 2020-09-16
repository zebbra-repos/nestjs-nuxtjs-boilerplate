import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export default registerAs("auth", () => {
  const authConfig: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
  };

  return authConfig;
});
