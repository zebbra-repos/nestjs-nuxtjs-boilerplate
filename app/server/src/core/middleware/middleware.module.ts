import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule, InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Repository } from "typeorm";
import { TypeormStore } from "connect-typeorm";

import { Session } from "./session.entity";
import { MiddlewareResolver } from "./middleware.resolver";
import {
  HelmetMiddleware,
  CorsMiddleware,
  ExpressSessionMiddleware,
  CsurfMiddleware,
} from "./middlewares";

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [MiddlewareResolver],
})
export class MiddlewareModule implements NestModule {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    HelmetMiddleware.configure({});

    CorsMiddleware.configure({
      origin: this.configService.get<string>("accessControlAllowOrigin"),
      credentials: !this.configService.get<boolean>("production"),
    });

    ExpressSessionMiddleware.configure({
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
        sameSite: true,
      },
    });

    const ignoreMethods = ["GET", "OPTIONS", "HEAD"];
    if (process.env.NODE_ENV !== "production") {
      ignoreMethods.push("POST");
    }

    CsurfMiddleware.configure({
      ignoreMethods,
    });

    consumer
      .apply(
        HelmetMiddleware,
        CorsMiddleware,
        ExpressSessionMiddleware,
        CsurfMiddleware,
      )
      .forRoutes("graphql");
  }
}
