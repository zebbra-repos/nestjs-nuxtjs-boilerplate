import { Module } from "@nestjs/common";
import { NuxtController } from "./nuxt.controller";

@Module({
  imports: [],
  controllers: [
    NuxtController, // Put this at the last, so that Nest will check for all other controller first before going to Nuxt
  ],
  providers: [],
})
export class AppModule {}
