import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { APP_FILTER } from "@nestjs/core";
import { FileNotFoundFilter } from "./file-not-found.filter";

@Module({
  imports: [
    ServeStaticModule.forRoot({
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
export class ServceStaticNuxtModule {}
