import { Controller, Get, Req, Res } from "@nestjs/common";
import { Builder, Nuxt } from "nuxt";
import { Request, Response } from "express";
import config from "../nuxt.config";

const { showBanner } = require("@nuxt/cli/dist/cli-banner");

config.dev = process.env.NODE_ENV !== "production";

@Controller()
export class NuxtController {
  nuxt!: Nuxt;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.nuxt = new Nuxt(config);
      this.nuxt.ready().then(() => showBanner(this.nuxt));
    } else if (process.env.IS_NUXT_ENABLED) {
      this.nuxt = new Nuxt(config);
      this.nuxt
        .ready()
        .then(() => new Builder(this.nuxt).build())
        .then(() => showBanner(this.nuxt));
    }
  }

  @Get("*") async root(@Req() req: Request, @Res() res: Response) {
    if (this.nuxt) {
      await this.nuxt.render(req, res);
    } else {
      res.send("Nuxt is disabled.");
    }
  }
}
