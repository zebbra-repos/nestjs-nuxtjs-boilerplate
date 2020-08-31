<template lang="pug">
  v-tooltip(v-if='isLoggedIn' left)
    template(v-slot:activator='{ on, attrs }')
      v-btn(icon v-bind='attrs' v-on='on' @click.stop='logout')
        v-icon mdi-logout
    span Logout

  v-tooltip(v-else left)
    template(v-slot:activator='{ on, attrs }')
      v-btn(icon nuxt to='login' v-bind='attrs' v-on='on')
        v-icon mdi-login
    span Login
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from "@nuxtjs/composition-api";
import { notificationStore } from "~/store";

export default defineComponent({
  name: "Session",
  setup() {
    const { app } = useContext();
    const isLoggedIn = ref(!!app.$apolloHelpers.getToken());

    const logout = async () => {
      await app.$apolloHelpers.onLogout();
      isLoggedIn.value = false;
      notificationStore.show({
        color: "info",
        message: "Logged out",
        timeout: 3000,
      });
    };

    return {
      isLoggedIn,
      logout,
    };
  },
});
</script>
