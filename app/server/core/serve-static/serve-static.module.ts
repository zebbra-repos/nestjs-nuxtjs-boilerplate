import { Module } from "@nestjs/common";
import { ServeStaticModule as ServeStatic } from "@nestjs/serve-static";
import { APP_FILTER } from "@nestjs/core";

import { FileNotFoundFilter } from "../../common/filters/file-not-found.filter";

@Module({
  imports: [
    ServeStatic.forRoot({
      rootPath: "dist/app/client",
      exclude: ["/graphql"],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FileNotFoundFilter,
    },
  ],
})
export class ServceStaticModule {}
