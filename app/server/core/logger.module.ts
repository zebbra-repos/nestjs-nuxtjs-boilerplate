import { LoggerModule } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";
import { RequestMethod } from "@nestjs/common";

export const loggerModule = LoggerModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      pinoHttp: {
        level: configService.get<string>("logger.level"),
        prettyPrint: {
          translateTime: true,
          messageFormat: "[{context}] - {msg}",
          ignore: "pid,hostname,context",
        },
      },
      exclude: [{ method: RequestMethod.ALL, path: "health" }],
    };
  },
});
