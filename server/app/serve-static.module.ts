import { join } from "path";
import { ServeStaticModule } from "@nestjs/serve-static";

export const serveStaticModule = ServeStaticModule.forRoot({
  rootPath: join(__dirname, "..", "client"),
  exclude: ["/api*", "/graphql*"],
});
