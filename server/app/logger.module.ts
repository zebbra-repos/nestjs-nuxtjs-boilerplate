import { LoggerModule } from "nestjs-pino";

export const loggerModule = LoggerModule.forRoot({
  pinoHttp: {
    level: process.env.LOG_LEVEL || "debug",
    prettyPrint: {
      translateTime: true,
      messageFormat: "[{context}] - {msg}",
      ignore: "pid,hostname,context",
    },
  },
});
