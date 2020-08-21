import * as Faker from "faker";
import { define } from "typeorm-factories";

import { User } from "../../server/users/users.entity";

define(User, (faker: typeof Faker) => {
  const user = new User();

  user.email = faker.internet.email();
  user.password = faker.internet.password(8);

  return user;
});
