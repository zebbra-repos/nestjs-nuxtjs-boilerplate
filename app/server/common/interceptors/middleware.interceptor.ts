import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class MiddlewareInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;

    // if incoming request was not send over graphql then req will be undefined
    if (req && req.res) {
      req.res.header(
        "Access-Control-Allow-Origin",
        this.configService.get<string>("accessControlAllowOrigin"),
      );
    }

    return next.handle();
  }
}
