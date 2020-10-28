<template lang="pug">
  v-tooltip(v-if='isLoggedIn' left)
    template(v-slot:activator='{ on, attrs }')
      v-btn.mr-1(icon v-bind='attrs' v-on='on' @click.stop='logout')
        v-icon mdi-logout
    span {{ $t('devise.sessions.sign-out') }}

  v-tooltip(v-else left)
    template(v-slot:activator='{ on, attrs }')
      v-btn.mr-1(icon nuxt to='/devise/sessions/new' v-bind='attrs' v-on='on')
        v-icon mdi-login
    span {{ $t('devise.sessions.new.sign-in') }}
</template>

<script lang="ts">
import { defineComponent, ref, useContext } from "@nuxtjs/composition-api";
import { useLogout } from "~/composable/useSession";

export default defineComponent({
  name: "Session",
  setup() {
    const { app, redirect } = useContext();
    const isLoggedIn = ref(!!app.$apolloHelpers.getToken());

    const logout = async () => {
      isLoggedIn.value = false;
      await useLogout(app, redirect);
    };

    return {
      isLoggedIn,
      logout,
    };
  },
});
</script>
