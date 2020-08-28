<template lang="pug">
  v-app
    my-notification
    v-navigation-drawer(v-model='drawer' :mini-variant='miniVariant' :clipped='clipped' fixed app)
      v-list
        v-list-item(v-for='(item, i) in items' :key='i' :to='item.to' router exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')
    v-app-bar(:clipped-left='clipped' fixed app)
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-btn(icon @click.stop='miniVariant = !miniVariant')
        v-icon mdi-{{ &grave;chevron-${miniVariant ? &quot;right&quot; : &quot;left&quot;}&grave; }}
      v-btn(icon @click.stop='clipped = !clipped')
        v-icon mdi-application
      v-btn(icon @click.stop='fixed = !fixed')
        v-icon mdi-minus
      v-toolbar-title(v-text='title')
      v-spacer
      v-btn(v-if='isLoggedIn' icon @click.stop='logout')
        v-icon mdi-logout
      v-btn(v-else icon nuxt to='login')
        v-icon mdi-login
    v-main
      v-container
        nuxt
    v-footer(:fixed='fixed' app)
      span &copy; {{ new Date().getFullYear() }}
      v-spacer
      span Version: {{ version }}
</template>

<script lang="ts">
import { defineComponent, useContext, ref } from "@nuxtjs/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetVersionQuery } from "~/apollo/generated-operations";
import { globalStore, notificationStore } from "~/store";

export default defineComponent({
  name: "DefaultLayout",
  setup() {
    const { app } = useContext();
    const isLoggedIn = ref(!!app.$apolloHelpers.getToken());

    const applicationVersion = useResult(
      useGetVersionQuery().result,
      globalStore.version,
      (data) => data.version,
    );

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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-account",
          title: "Profile",
          to: "/profile",
        },
      ],
      miniVariant: false,
      title: "Vuetify.js",
      version: applicationVersion,
    };
  },
});
</script>
