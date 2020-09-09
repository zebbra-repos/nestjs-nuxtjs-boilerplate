import { LoggerModule as Logger } from "nestjs-pino";
import { ConfigService } from "@nestjs/config";
import { RequestMethod, Module } from "@nestjs/common";

@Module({
  imports: [
    Logger.forRootAsync({
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
    }),
  ],
})
export class LoggerModule {}
