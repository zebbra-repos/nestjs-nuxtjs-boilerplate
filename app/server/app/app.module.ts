import { Module } from "@nestjs/common";

import { AuthModule } from "../auth/auth.module";
import { UsersModule } from "../users/users.module";
import { configModule } from "./config.module";
import { loggerModule } from "./logger.module";
import { typeormModule } from "./typeorm.module";
import { graphQLModule } from "./graphql.module";

@Module({
  imports: [
    configModule,
    loggerModule,
    typeormModule,
    graphQLModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
