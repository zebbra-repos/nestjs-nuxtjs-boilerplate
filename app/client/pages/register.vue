<template lang="pug">
  v-card.elevation-12(:loading='loading')
    v-toolbar(color='accent' flat)
      v-toolbar-title Register
      v-spacer
      v-btn(text color='primary' nuxt to='/login') Login
    v-card-text
      v-alert(v-if='error' type='error' dense) {{ error }}
      v-alert(v-if='globalError' type='error' dense) {{ globalError }}
      v-form(v-model='valid')
        v-text-field(v-model='input.firstName' :rules='rules.name' :error-messages='messages.firstName' :counter='32' validate-on-blur label='First Name')
        v-text-field(v-model='input.lastName' :rules='rules.name' :error-messages='messages.lastName' :counter='32' validate-on-blur label='Last Name')
        v-text-field(v-model='input.email' :rules='rules.email' :error-messages='messages.email' label='E-mail' required)
        v-text-field(v-model='input.password' :rules='rules.password' :error-messages='messages.password' :counter='32' validate-on-blur label='Password' type='password' required)
    v-card-actions
      v-spacer
      v-btn(text color='primary' :disabled='!valid' @click='register') Register
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
  ref,
} from "@nuxtjs/composition-api";
import { useRegisterUserMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { notificationStore } from "~/store";
import { baseRules, emailRules } from "~/utils/rules";

export default defineComponent({
  name: "Register",
  layout: "session",
  setup() {
    const { redirect } = useContext();
    const input = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const rules = {
      name: [baseRules.minLength(3, true), baseRules.maxLength(32)],
      email: [baseRules.required(), emailRules.emailFormat()],
      password: [
        baseRules.required(),
        baseRules.minLength(8),
        baseRules.maxLength(32),
      ],
    };

    const messages = reactive({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const {
      mutate: register,
      error,
      loading,
      onDone,
    } = useRegisterUserMutation(() => ({
      errorPolicy: "all",
      fetchPolicy: "no-cache",
      variables: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      },
    }));

    const globalError = ref("");
    onDone((data) => {
      if (data?.errors) {
        errorHandler(data.errors, messages, globalError);
      } else {
        notificationStore.show({
          color: "success",
          message: "Registration successfull. Please login",
          timeout: 3000,
        });

        redirect("/login");
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
