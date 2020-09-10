import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class MiddlewareInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = GqlExecutionContext.create(context);
        const req: Request = ctx.getContext().req;

        // if incoming request was not send over graphql then req will
        // be undefined
        if (req) {
          if (req.method === "GET" && req.session) {
            req.session.token = req.csrfToken();
          }

          if (req.res) {
            req.res.header(
              "Access-Control-Allow-Origin",
              this.configService.get<string>("accessControlAllowOrigin"),
            );
          }
        }

        return data;
      }),
    );
  }
}
