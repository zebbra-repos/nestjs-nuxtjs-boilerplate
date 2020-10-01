<template lang="pug">
  client-only
    my-loading-placeholder(slot='placeholder')
    v-card.pt-3(:loading='loading')
      v-toolbar(color='accent' flat)
        v-toolbar-title {{ $t('devise.registrations.new.sign-up') }}
      v-card-text
        v-alert(v-if='error' type='error' dense) {{ error }}
        v-alert(v-if='globalError' type='error' dense) {{ globalError }}
        v-form(v-model='valid' lazy-validation)
          v-text-field(
            v-model='input.firstName'
            :rules='rules.name'
            :error-messages='messages.firstName'
            :counter='32'
            validate-on-blur
            :label='$t("user.first-name")'
            autofocus
          )
          v-text-field(
            v-model='input.lastName'
            :rules='rules.name'
            :error-messages='messages.lastName'
            :counter='32'
            validate-on-blur
            :label='$t("user.last-name")'
          )
          v-text-field(
            v-model='input.email'
            :rules='rules.email'
            :error-messages='messages.email'
            validate-on-blur
            :label='$t("user.email")'
            type='email'
            required
          )
          v-text-field(
            v-model='input.password'
            :rules='rules.password'
            :error-messages='messages.password'
            :counter='32'
            :label='$t("user.password")'
            type='password'
            required
          )
      v-card-actions
        v-row
          v-col(cols='auto')
            v-btn(
            color='primary'
            outlined
              :disabled='!valid'
              @click='register'
            ) {{ $t('devise.registrations.new.sign-up') }}
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

import { useSignUpMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { notificationStore } from "~/store";
import useCsrf from "~/composable/useCsrf";
import { useRequireNoAuthentication } from "~/composable/useGuards";

export default defineComponent({
  name: "Register",
  layout: "devise",
  setup() {
    useRequireNoAuthentication();
    useCsrf();

    const {
      redirect,
      app: { $validator },
    } = useContext();

    const input = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const rules = {
      name: [$validator.minLength(3, true), $validator.maxLength(32)],
      email: [$validator.required(), $validator.emailFormat()],
      password: [
        $validator.required(),
        $validator.minLength(8),
        $validator.maxLength(32),
      ],
    };

    const messages = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    if (process.client) {
      watch(input, () => {
        messages.firstName = "";
        messages.lastName = "";
        messages.email = "";
        messages.password = "";
      });
    }

    const { mutate: register, error, loading, onDone } = useSignUpMutation(
      () => ({
        errorPolicy: "all",
        fetchPolicy: "no-cache",
        variables: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: input.password,
        },
      }),
    );

    const globalError = ref("");
    onDone((data) => {
      if (data?.errors) {
        errorHandler(data.errors, messages, globalError);
      } else {
        notificationStore.show({
          color: "info",
          message: data?.data?.signUp.message,
          timeout: 3000,
        });

        redirect("/devise/sessions/new");
      }
    });

    return {
      valid: false,
      input,
      rules,
      messages,
      register,
      loading,
      error,
      globalError,
    };
  },
});
</script>
