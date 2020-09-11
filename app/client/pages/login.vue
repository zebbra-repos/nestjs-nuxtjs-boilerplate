<template lang="pug">
  v-card.elevation-12(:loading='loading')
    v-toolbar(color='accent' flat)
      v-toolbar-title Login
      v-spacer
      v-btn(text color='primary' nuxt to='/register') Register
    v-card-text
      v-alert(v-if='error' type='error' dense) {{ error }}
      v-alert(v-if='globalError' type='error' dense) {{ globalError }}
      v-form(v-model='valid')
        v-text-field(v-model='input.email' :rules='rules.email' :error-messages='messages.email' @keydown.enter='valid && login()' validate-on-blur label='E-mail' prepend-icon='mdi-account')
        v-text-field(v-model='input.password' :rules='rules.password' :error-messages='messages.password' :counter='32' @keydown.enter='valid && login()' label='Password' prepend-icon='mdi-lock' type='password')
    v-card-actions
      v-btn(text nuxt to="/") Home
      v-spacer
      v-btn(text color='primary' :disabled='!valid' @click='login') Login
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  ref,
} from "@nuxtjs/composition-api";

import useCsrf from "~/composable/useCsrf";
import { baseRules, emailRules } from "~/utils/rules";
import { useLoginUserMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { notificationStore } from "~/store";

export default defineComponent({
  name: "Login",
  layout: "session",
  setup() {
    useCsrf();

    const {
      app: { $apolloHelpers },
      error,
      redirect,
    } = useContext();

    const input = reactive({
      email: "",
      password: "",
    });

    const rules = {
      email: [baseRules.required(), emailRules.emailFormat()],
      password: [baseRules.required()],
    };

    const messages = reactive({
      email: "",
      password: "",
    });

    const {
      mutate: login,
      error: mutationError,
      loading,
      onDone,
    } = useLoginUserMutation(() => ({
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      variables: {
        email: input.email,
        password: input.password,
      },
    }));

    const globalError = ref("");
    onDone(async (data) => {
      if (data?.errors) {
        errorHandler(data.errors, messages, globalError);
      } else if (!data?.data?.login.accessToken) {
        error(new Error("Missing access token"));
      } else {
        await $apolloHelpers.onLogin(data.data.login.accessToken);

        notificationStore.show({
          color: "success",
          message: "Login successfull",
          timeout: 3000,
        });

        setTimeout(() => {
          redirect("/profile");
        }, 200);
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
