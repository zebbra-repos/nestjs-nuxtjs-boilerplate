import { Configuration } from "@nuxt/types";
import { Request, Response } from "express";

declare module "nuxt" {
  export class Nuxt {
    constructor(config: Configuration);
    ready(): Promise<any>;
    render(req: Request, res: Response): Promise<any>;
  }
  export class Builder {
    constructor(nuxtInstance: Nuxt);
    build(): Promise<any>;
  }
}
