import { MailerModule as Mailer, MailerOptions } from "@nestjs-modules/mailer";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { createTransport } from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";
import { ConfigService } from "@nestjs/config";

export const SendgridModule = Mailer.forRootAsync({
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const isProd = configService.get<boolean>("production");

    const config: MailerOptions = {
      defaults: {
        from: configService.get<string>("sendgrid.defaults.from"),
      },
      preview: !isProd,
      transport: loadTransporter(configService),
      template: {
        dir: isProd
          ? `${process.cwd()}/dist/app/server/templates`
          : `${process.cwd()}/app/server/templates`,
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    };

    return config;
  },
});

export const loadTransporter = (configService: ConfigService) => {
  if (configService.get<boolean>("production")) {
    return createTransport(
      nodemailerSendgrid({
        apiKey: configService.get<string>("sendgrid.apiKey")!,
      }),
    );
  }

  return {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "florencio.johnson96@ethereal.email",
      pass: "xCe5fUNbBKxESCFr2K",
    },
  };
};
