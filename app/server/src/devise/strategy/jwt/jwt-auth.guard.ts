import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  public getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // if websocket connection is unauthorized then req.headers
    // is missing and passport jwt schema throws an error. thus
    // we add an empty headers object to the request in this case
    if (!req.headers) {
      req.headers = {};
    }

    return req;
  }
}
