<template lang="pug">
  v-navigation-drawer(
    :value='drawer'
    :mini-variant='miniVariant'
    :clipped='clipped'
    color='primary'
    fixed
    app
  )
    v-list
      v-list-item(
        v-for='(item, i) in items'
        :key='i'
        :to='item.to'
        router
        exact
      )
        v-list-item-action
          v-icon {{ item.icon }}
        v-list-item-content
          v-list-item-title(v-text='$t(`navigation.items.${item.title}`)')
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";
import { appBarStore } from "~/store";

export default defineComponent({
  name: "MyNavigation",
  setup() {
    return {
      clipped: computed(() => appBarStore.clipped),
      drawer: computed(() => appBarStore.drawer),
      miniVariant: computed(() => appBarStore.miniVariant),
      items: [
        {
          icon: "mdi-apps",
          title: "welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "inspire",
          to: "/inspire",
        },
        {
          icon: "mdi-account",
          title: "profile",
          to: "/users/profile",
        },
      ],
    };
  },
});
</script>
