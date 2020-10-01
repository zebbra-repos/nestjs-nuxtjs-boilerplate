import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { classToPlain } from "class-transformer";
// import { MailerService } from "@nestjs-modules/mailer";
// import { I18nService } from "nestjs-i18n";

import { User, UsersService, UserDto, CreateUserDto } from "../../users";

@Injectable()
export class SessionService {
  private baseUrl: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    // private readonly mailService: MailerService,
    // private readonly i18nService: I18nService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = configService.get<string>("accessControlAllowOrigin")!;
  }

  async validate(user: UserDto) {
    return await user;
  }

  async signUp(payload: CreateUserDto) {
    return await this.usersService.signUp(payload);
    // const { email } = payload;
    // let user = await this.usersService.findByEmail(email);

    // if (user) {
    //   throw new BadRequestException("User already exists");
    // }

    // user = await this.usersService.build(payload);
    // return await this.usersService.create(user);
  }

  signIn(user: User) {
    return {
      expiresIn: this.configService.get<number>(
        "devise.authentication.signOptions.expiresIn",
      )!,
      accessToken: this.jwtService.sign(classToPlain(user)),
    };
  }

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
