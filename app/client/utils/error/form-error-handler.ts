import { GraphQLError } from "graphql";
import { Ref } from "@vue/composition-api";
import { ValidationError } from "class-validator";

import { ErrorNames } from "~/utils/enums/error-names.enum";
import { notificationStore } from "~/store";

export default function (
  errors: ReadonlyArray<GraphQLError> = [],
  attributes: { [x: string]: string },
  globalError?: Ref<string>,
) {
  errors.forEach((error) => {
    if (error.message === ErrorNames.VALIDATION) {
      let validationErrros =
        error.extensions?.exception?.response?.message || [];

      if (!Array.isArray(validationErrros)) {
        validationErrros = [validationErrros];
      }

      if (validationErrros.length) {
        validationErrros.forEach((error: ValidationError) => {
          attributes[error.property] = error.constraints
            ? Object.values(error.constraints).join(", ")
            : "";
        });

        return;
      }
    }

    if (globalError) {
      globalError.value = error.message;
    } else {
      notificationStore.show({
        color: "error",
        message: error.message,
        timeout: 3000,
      });
    }
  });
}
