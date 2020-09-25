<template lang="pug">
  v-card.pt-3(:loading='loading')
    v-toolbar(color='accent' flat)
      v-toolbar-title {{ $t('devise.passwords.new.forgot-your-password') }}
    v-card-text
      v-alert(v-if='error' type='error' dense) {{ error }}
      v-alert(v-if='globalError' type='error' dense) {{ globalError }}
      v-form(v-model='valid' lazy-validation @submit.prevent)
        v-text-field(
          v-model='input.email'
          :rules='rules.email'
          :error-messages='messages.email'
          @keydown.enter='reset()'
          validate-on-blur
          :label='$t("user.email")'
          prepend-icon='mdi-account'
          type='email'
          autofocus
        )
    v-card-actions
      v-row
        v-col(cols='auto')
          v-btn(
           color='primary'
           outlined
            :disabled='!valid'
            @click='reset'
          ) {{ $t('devise.passwords.new.submit') }}
        v-col.mr-auto(cols='auto')
          v-btn(outlined nuxt to='/') {{ $t('devise.shared.links.back') }}
        v-col(cols='auto')
          devise-links
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  ref,
  watch,
} from "@nuxtjs/composition-api";

import useCsrf from "~/composable/useCsrf";
import { useResetPasswordRequestMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { notificationStore } from "~/store";
import { useIsLoggedInGuard } from "~/composable/useSession";

export default defineComponent({
  name: "ResetPassword",
  layout: "devise",
  setup() {
    useIsLoggedInGuard();
    useCsrf();

    const {
      redirect,
      app: { $validator },
    } = useContext();

    const input = reactive({
      email: "",
    });

    const rules = {
      email: [$validator.required(), $validator.emailFormat()],
    };

    const messages = reactive({
      email: "",
    });

    if (process.client) {
      watch(input, () => {
        messages.email = "";
      });
    }

    const {
      mutate: reset,
      error: mutationError,
      loading,
      onDone,
    } = useResetPasswordRequestMutation(() => ({
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      variables: {
        email: input.email,
      },
    }));

    const globalError = ref("");
    onDone((data) => {
      if (data?.errors) {
        errorHandler(data.errors, messages, globalError);
      } else {
        notificationStore.show({
          color: "info",
          message: data?.data?.resetPasswordRequest.message,
          timeout: 6000,
        });

        redirect("/devise/sessions/new");
      }
    });

    return {
      valid: false,
      input,
      rules,
      messages,
      reset,
      error: mutationError,
      globalError,
      loading,
    };
  },
});
</script>
