import { Repository } from "typeorm";

export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    metadata: {
      columns: [],
      relations: [],
    },
    find: jest.fn((entities) => entities),
    findOne: jest.fn((entity) => entity),
    findOneOrFail: jest.fn((entity) => entity),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
  }),
);
