import { Controller, Get, Req, Res, Next } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ConfigService } from "@nestjs/config";

// @ts-ignore
import { Nuxt } from "nuxt";
import NuxtConfig from "../../../../nuxt.config";

const { showBanner } = require("@nuxt/cli/dist/cli-banner");
NuxtConfig.dev = false;

@Controller()
export class NuxtController {
  nuxt!: Nuxt;

  constructor(private readonly configService: ConfigService) {
    if (configService.get<boolean>("production")) {
      this.nuxt = new Nuxt(NuxtConfig);
      this.nuxt.ready().then(() => showBanner(this.nuxt));
    }
  }

  @Get("*") async root(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (req.path.startsWith("/graphql")) {
      return next();
    } else if (this.nuxt) {
      await this.nuxt.render(req, res);
    } else {
      res.send("Nuxt is disabled.");
    }
  }
}
