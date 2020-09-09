import { Module } from "@nestjs/common";
import { TypeOrmModule, InjectRepository } from "@nestjs/typeorm";
import { HttpAdapterHost, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { TypeormStore } from "connect-typeorm";
import ExpressSession from "express-session";
import helmet from "helmet";
import cors from "cors";
import csurf from "csurf";
import { Request } from "express";

import { MiddlewareInterceptor } from "../../common/interceptors/middleware.interceptor";
import { Session } from "./session.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MiddlewareInterceptor,
    },
  ],
})
export class MiddlewareModule {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly adapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {
    const app = this.adapterHost.httpAdapter.getInstance();

    // https://docs.nestjs.com/techniques/security

    // helmet
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            blockAllMixedContent: [],
            fontSrc: ["'self'", "https:", "data:"],
            frameAncestors: ["'self'"],
            imgSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'", "cdn.jsdelivr.net"],
            scriptSrcAttr: ["'none'"],
            styleSrc: ["'self'", "https: 'unsafe-inline'"],
            upgradeInsecureRequests: [],
          },
        },
      }),
    );

    // cors
    app.use(
      cors({
        origin: this.configService.get<string>("accessControlAllowOrigin"),
        credentials: true,
      }),
    );

    // csurf
    app.use(
      ExpressSession({
        secret: this.configService.get<string>("csrfSecret")!,
        name: "connect.sid",
        store: new TypeormStore({
          cleanupLimit: 2,
        }).connect(this.sessionRepository),
        rolling: false,
        resave: false,
        saveUninitialized: false,
        unset: "keep",
        cookie: {
          secure: this.configService.get<boolean>("production"),
          sameSite: true,
        },
      }),
    );
    app.use(
      csurf({
        value: (req: Request) => req.session?.token,
      }),
    );
  }
}
