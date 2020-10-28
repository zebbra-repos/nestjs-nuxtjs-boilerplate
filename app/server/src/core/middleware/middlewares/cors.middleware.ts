import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

import cors from "cors";

// https://docs.nestjs.com/techniques/security
// https://docs.nestjs.com/middleware

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private static options: cors.CorsOptions;

  public static configure(options: cors.CorsOptions) {
    this.options = options;
  }

  public use(req: Request, res: Response, next: NextFunction) {
    if (CorsMiddleware.options) {
      return cors(CorsMiddleware.options)(req, res, next);
    } else {
      return cors()(req, res, next);
    }
  }
}
