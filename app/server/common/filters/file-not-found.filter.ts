import { join } from "path";
import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

@Catch(TypeError)
export class FileNotFoundFilter implements ExceptionFilter {
  catch(_exception: TypeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.sendFile(join(__dirname, "../../../client/redirected/index.html"));
  }
}
