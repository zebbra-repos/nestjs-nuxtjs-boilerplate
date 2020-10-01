import { Controller, Get, Req, Res, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PinoLogger } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";

// @ts-ignore
import { Nuxt } from "nuxt";

import configFile from "../../../../../nuxt.config";
const { showBanner } = require("@nuxt/cli/dist/cli-banner");

const OVERRIDES = {
  dry: { dev: false, server: false },
  dev: { dev: true, _build: true },
  build: { dev: false, server: false, _build: true },
  start: { dev: false, _start: true },
};

@Controller()
export class NuxtController {
  private nuxt!: Nuxt;
  private production!: boolean;

  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(NuxtController.name);

    this.production = configService.get<boolean>("production")!;

    if (this.production) {
      this.init();
    }
  }

  public async init() {
    Object.assign(configFile, OVERRIDES.start);

    try {
      this.nuxt = new Nuxt(configFile);
      await this.nuxt.ready();
      showBanner(this.nuxt);
    } catch (error) {
      this.logger.fatal(error);
    }
  }

  @Get("*")
  public root(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (!this.production || req.path.startsWith("/graphql")) {
      return next();
    } else if (this.nuxt) {
      return this.nuxt.render(req, res);
    } else {
      return res.send("Nuxt is disabled.");
    }
  }
}
