import { reactive, ref } from "@nuxtjs/composition-api";

import handle from "@/utils/error/form-error-handler";

describe("Error", () => {
  describe("form-error-handler", () => {
    it("extracts validation error information", () => {
      const attributes = reactive({ lastName: "" });
      const globalError = ref("");
      const errors = [
        {
          message: "Unprocessable Entity Exception",
          locations: [{ line: 2, column: 3 }],
          path: ["signUp"],
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            exception: {
              response: {
                statusCode: 422,
                message: [
                  {
                    target: {
                      firstName: "test@test.com",
                      lastName: "2",
                      email: "test@test.com",
                      password: "test@test.com",
                    },
                    value: "2",
                    property: "lastName",
                    children: [],
                    constraints: {
                      minLength:
                        "lastName must be longer than or equal to 3 characters",
                    },
                  },
                ],
                error: "Unprocessable Entity",
              },
              status: 422,
              message: "Unprocessable Entity Exception",
              stacktrace: [
                "Error: Unprocessable Entity Exception",
                "    at ValidationPipe.exceptionFactory (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/dist/app/server/src/main.js:20:54)",
                "    at ValidationPipe.transform (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/common/pipes/validation.pipe.js:56:24)",
                "    at processTicksAndRejections (internal/process/task_queues.js:97:5)",
                "    at async resolveParamValue (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:143:31)",
                "    at async Promise.all (index 1)",
                "    at async pipesFn (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:145:13)",
                "    at async /Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:68:17",
              ],
            },
          },
          nodes: expect.anything(),
          source: expect.anything(),
          name: expect.anything(),
          originalError: expect.anything(),
          positions: expect.anything(),
        },
      ];

      handle(errors, attributes, globalError);

      expect(attributes.lastName).toBe(
        "lastName must be longer than or equal to 3 characters",
      );
      expect(globalError.value).toBe("");
    });

    it("stores error message on globalError if no validation errors are found", () => {
      const attributes = reactive({ lastName: "" });
      const globalError = ref("");
      const errors = [
        {
          message: "Unprocessable Entity Exception",
          locations: [{ line: 2, column: 3 }],
          path: ["signUp"],
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            exception: {
              response: {
                statusCode: 422,
                message: [],
                error: "Unprocessable Entity",
              },
              status: 422,
              message: "Unprocessable Entity Exception",
              stacktrace: [
                "Error: Unprocessable Entity Exception",
                "    at ValidationPipe.exceptionFactory (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/dist/app/server/src/main.js:20:54)",
                "    at ValidationPipe.transform (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/common/pipes/validation.pipe.js:56:24)",
                "    at processTicksAndRejections (internal/process/task_queues.js:97:5)",
                "    at async resolveParamValue (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:143:31)",
                "    at async Promise.all (index 1)",
                "    at async pipesFn (/Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:145:13)",
                "    at async /Users/mike/dev/boilerplates/nest-nuxt-boilerplate/node_modules/@nestjs/core/helpers/external-context-creator.js:68:17",
              ],
            },
          },
          nodes: expect.anything(),
          source: expect.anything(),
          name: expect.anything(),
          originalError: expect.anything(),
          positions: expect.anything(),
        },
      ];

      handle(errors, attributes, globalError);

      expect(attributes.lastName).toBe("");
      expect(globalError.value).toBe("Unprocessable Entity Exception");
    });
  });
});
