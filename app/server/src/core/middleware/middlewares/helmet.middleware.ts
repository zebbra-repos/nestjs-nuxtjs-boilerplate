import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import helmet from "helmet";

// https://docs.nestjs.com/techniques/security
// https://docs.nestjs.com/middleware

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private static options: any;

  public static configure(options: any) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (HelmetMiddleware.options) {
      helmet(HelmetMiddleware.options)(req, res, next);
    } else {
      helmet()(req, res, next);
    }
  }
}
