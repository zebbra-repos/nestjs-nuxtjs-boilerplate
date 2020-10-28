import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export class DeviseModuleOptions {
  public readonly authentication: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
  };

  public readonly registration = {
    enabled: true,
    afterSignUpPath: "/users/profile",
    afterInactiveSignUpPath: "/devise/sessions/new",
  };
}

export default registerAs("devise", () => new DeviseModuleOptions());
