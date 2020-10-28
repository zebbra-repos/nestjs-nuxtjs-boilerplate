<template lang="pug">
  v-footer(:fixed='fixed' app)
    span &copy; {{ new Date().getFullYear() }}
    v-spacer
    span Version: {{ version }}
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";
import { appBarStore, globalStore } from "~/store";

export default defineComponent({
  name: "MyFooter",
  setup() {
    return {
      fixed: computed(() => appBarStore.fixed),
      version: computed(() => globalStore.version),
    };
  },
});
</script>
