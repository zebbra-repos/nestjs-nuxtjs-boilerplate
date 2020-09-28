<template lang="pug">
  v-card.pt-3(:loading='loading')
    v-toolbar(color='accent' flat)
      v-toolbar-title {{ $t('devise.sessions.new.sign-in') }}
    v-card-text
      v-alert(v-if='error' type='error' dense) {{ error }}
      v-alert(v-if='globalError' type='error' dense) {{ globalError }}
      v-form(v-model='valid' lazy-validation)
        v-text-field(
          v-model='input.email'
          :rules='rules.email'
          :error-messages='messages.email'
          @keydown.enter='valid && login()'
          validate-on-blur
          :label='$t("user.email")'
          prepend-icon='mdi-account'
          type='email'
          autofocus
        )
        v-text-field(
          v-model='input.password'
          :rules='rules.password'
          :error-messages='messages.password'
          :counter='32'
          @keydown.enter='valid && login()'
          :label='$t("user.password")'
          prepend-icon='mdi-lock'
          type='password'
        )
    v-card-actions
      v-row
        v-col(cols='auto')
          v-btn(
           color='primary'
           outlined
            :disabled='!valid'
            @click='login'
          ) {{ $t('devise.sessions.new.sign-in') }}
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
import { useSignInMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { useIsLoggedInGuard, useLogin } from "~/composable/useSession";

export default defineComponent({
  name: "Login",
  layout: "devise",
  setup() {
    useIsLoggedInGuard();
    useCsrf();

    const { app, redirect, error } = useContext();
    const { $validator } = app;

    const input = reactive({
      email: "",
      password: "",
    });

    const rules = {
      email: [$validator.required(), $validator.emailFormat()],
      password: [$validator.required()],
    };

    const messages = reactive({
      email: "",
      password: "",
    });

    if (process.client) {
      watch(input, () => {
        messages.email = "";
        messages.password = "";
      });
    }

    const {
      mutate: login,
      error: mutationError,
      loading,
      onDone,
    } = useSignInMutation(() => ({
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      variables: {
        email: input.email,
        password: input.password,
      },
    }));

    const globalError = ref("");
    onDone((data) => {
      if (data?.errors) {
        errorHandler(data.errors, messages, globalError);
      } else if (!data?.data?.signIn.accessToken) {
        error(new Error("Missing access token"));
      } else {
        useLogin(app, redirect, data.data.signIn);
      }
    });

    return {
      valid: false,
      input,
      rules,
      messages,
      login,
      error: mutationError,
      globalError,
      loading,
    };
  },
});
</script>
