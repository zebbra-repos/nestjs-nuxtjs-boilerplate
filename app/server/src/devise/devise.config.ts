import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export class DeviceModuleOptions {
  public readonly authentication: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
  };

  public readonly registration = {
    enabled: true,
  };

  public readonly confirmation = {
    enabled: false,
    confirmWithin: 1000 * 60 * 60 * 24 * 3,
  };

  public readonly unlock = {
    enabled: false,
    unlockIn: 1000 * 60 * 60 * 24 * 2,
    strategy: "both",
  };
}

export default registerAs("devise", () => new DeviceModuleOptions());
