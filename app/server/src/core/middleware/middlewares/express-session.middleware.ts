import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import ExpressSession from "express-session";

// https://docs.nestjs.com/techniques/security
// https://docs.nestjs.com/middleware

@Injectable()
export class ExpressSessionMiddleware implements NestMiddleware {
  private static options: ExpressSession.SessionOptions;

  public static configure(options: ExpressSession.SessionOptions) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (ExpressSessionMiddleware.options) {
      return ExpressSession(ExpressSessionMiddleware.options)(req, res, next);
    } else {
      return ExpressSession()(req, res, next);
    }
  }
}
