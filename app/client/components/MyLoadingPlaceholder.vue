<template lang="pug">
  span
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "MyLoadingPlaceholder",
  setup() {
    onBeforeMount(() => {
      window.$nuxt.$nextTick(() => {
        window.$nuxt.$loading.start();
      });
    });

    onBeforeUnmount(() => {
      setTimeout(() => window.$nuxt.$loading.finish(), 500);
    });
  },
});
</script>
