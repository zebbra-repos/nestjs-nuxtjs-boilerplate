<template lang="pug">
  v-card(:loading='loading')
    v-toolbar(color='accent' flat)
      v-toolbar-title {{ $t('devise.unlocks.new.resend-unlock-instructions') }}
    v-card-text
      v-alert(v-if='error' type='error' dense) {{ error }}
      v-alert(v-if='globalError' type='error' dense) {{ globalError }}
      v-form(v-model='valid' lazy-validation @submit.prevent)
        v-text-field(
          v-model='input.email'
          :rules='rules.email'
          :error-messages='messages.email'
          @keydown.enter='valid && unlock()'
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
            @click='unlock'
          ) {{ $t('devise.unlocks.new.submit') }}
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
import { useUnlockAccountRequestMutation } from "~/apollo/generated-operations";
import errorHandler from "~/utils/error/form-error-handler";
import { notificationStore } from "~/store";
import { useRequireNoAuthentication } from "~/composable/useGuards";

export default defineComponent({
  name: "UnlockInstructions",
  layout: "devise",
  setup() {
    useRequireNoAuthentication();
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
      mutate: unlock,
      error: mutationError,
      loading,
      onDone,
    } = useUnlockAccountRequestMutation(() => ({
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
          message: data?.data?.unlockAccountRequest.message,
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
      unlock,
      error: mutationError,
      globalError,
      loading,
    };
  },
});
</script>
