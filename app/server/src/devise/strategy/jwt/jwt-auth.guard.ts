import { Injectable, ExecutionContext, ContextType } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  public getRequest(context: ExecutionContext) {
    if (context.getType<ContextType | "graphql">() === "graphql") {
      const ctx = GqlExecutionContext.create(context).getContext();

      // required for passport.js for websocket grapqhl subscriptions
      if (ctx.websocketHeader?.connectionParams) {
        const websocketHeader = ctx.websocketHeader?.connectionParams || {};

        return { headers: { ...websocketHeader } };
      }

      // if websocket connection is unauthorized then req.headers
      // is missing and passport jwt schema throws an error. thus
      // we add an empty headers object to the request in this case
      if (!ctx.req.headers) {
        ctx.req.headers = {};
      }

      // Make sure to set the "authorization" header in lower case, because the
      // jwt passport strategy only parses lower case authorization
      if (ctx.req.headers.Authorization) {
        ctx.req.headers.authorization = ctx.req.headers.Authorization;
        delete ctx.req.headers.Authorization;
      }

      return ctx.req;
    }

    return context.switchToHttp().getRequest();
  }
}
