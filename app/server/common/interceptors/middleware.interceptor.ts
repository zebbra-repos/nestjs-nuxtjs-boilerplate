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

@Injectable()
export class MiddlewareInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;

        if (req.session) {
          req.session.token = req.csrfToken();
        }

        req.res.header(
          "Access-Control-Allow-Origin",
          this.configService.get<string>("accessControlAllowOrigin"),
        );
        return data;
      }),
    );
  }
}
