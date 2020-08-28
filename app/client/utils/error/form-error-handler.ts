import { GraphQLError } from "apollo-link/node_modules/graphql";
import { Ref } from "@vue/composition-api";
import { ErrorNames } from "~/utils/enums/error-names.enum";
import { notificationStore } from "~/store";
import { CustomValidationError } from "~/types";

export default function (
  errors: ReadonlyArray<GraphQLError> = [],
  messages: { [x: string]: string },
  globalError?: Ref<string>,
) {
  errors.forEach((error) => {
    if (error.name === ErrorNames.VALIDATION) {
      ((error.message as unknown) as CustomValidationError[]).forEach(
        (message) => {
          messages[message.property] = message.message;
        },
      );
    } else if (globalError) {
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
