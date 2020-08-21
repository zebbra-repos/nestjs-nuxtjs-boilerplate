import { INestApplication } from "@nestjs/common";
import request from "supertest";

import { User } from "../../server/users/users.entity";

export function register(app: INestApplication, user: User) {
  return request(app.getHttpServer()).post("/graphql").send({
    operationName: null,
    query: `
      mutation($email: String!, $password: String!) {
        register(createUserInput: { email: $email, password: $password }) {
          id
          email
        }
      }
    `,
    variables: user,
  });
}

export function login(app: INestApplication, user: User) {
  return request(app.getHttpServer()).post("/graphql").send({
    operationName: null,
    query: `
      mutation($email: String!, $password: String!) {
        login(loginUserInput: { email: $email, password: $password }) {
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
    const result = await register(app, user);
    user.id = result.body.data.register.id;
  }
  const response = await login(app, user);
  return response.body.data.login.accessToken;
}
