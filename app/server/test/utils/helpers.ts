import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { User } from "../../src/users";

export function signUp(app: INestApplication, user: User) {
  return request(app.getHttpServer()).post("/graphql").send({
    operationName: null,
    query: `
      mutation($email: String!, $password: String!) {
        signUp(data: { email: $email, password: $password }) {
          message
        }
      }
    `,
    variables: user,
  });
}

export function signIn(app: INestApplication, user: User) {
  return request(app.getHttpServer()).post("/graphql").send({
    operationName: null,
    query: `
      mutation($email: String!, $password: String!) {
        signIn(data: { email: $email, password: $password }) {
          expiresIn
          accessToken
        }
      }
    `,
    variables: user,
  });
}

export async function createToken(
  app: INestApplication,
  user: User,
  skipRegister = false,
) {
  if (!skipRegister) {
    await signUp(app, user);
  }
  const response = await signIn(app, user);
  return response.body.data.signIn.accessToken;
}
