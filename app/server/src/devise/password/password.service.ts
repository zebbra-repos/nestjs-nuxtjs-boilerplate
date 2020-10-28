import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordService {
  // async resetPasswordRequest(email: string, lang: string = "en") {
  //   const context = await this.i18nService.t(
  //     "devise.mailer.reset-password-instructions",
  //     {
  //       lang,
  //       args: {
  //         recipient: email,
  //       },
  //     },
  //   );
  //   const { subject } = context;
  //   context.link = `${this.baseUrl}/devise/passwords/edit?token=secret`;
  //   let message = await this.i18nService.t(
  //     "devise.passwords.send-instructions",
  //     { lang },
  //   );
  //   try {
  //     this.mailService.sendMail({
  //       to: email,
  //       subject,
  //       template: "reset-password-instructions",
  //       context,
  //     });
  //   } catch (error) {
  //     message = error.message;
  //   }
  //   return {
  //     message,
  //   };
  // }
}
