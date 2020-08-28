<template lang="pug">
  v-layout
    v-flex.text-center
      v-card
        v-card-title(v-if='loading') Loading Profile 
        v-card-title(v-else-if='error') {{ error }} 
        v-card-title(v-else='') {{ profile }} 
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetProfileQuery } from "~/apollo/generated-operations";

export default defineComponent({
  name: "Profile",
  middleware: "auth",
  setup() {
    const { error, loading, result } = useGetProfileQuery();
    const profile = useResult(result);

    return {
      error,
      loading,
      profile,
    };
  },
});
</script>
