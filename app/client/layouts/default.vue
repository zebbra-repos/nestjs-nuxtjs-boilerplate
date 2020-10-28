<template lang="pug">
  v-app
    my-notification
    my-navigation
    my-app-bar
    v-main
      v-container
        nuxt
    my-footer
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "DefaultLayout",
});
</script>
