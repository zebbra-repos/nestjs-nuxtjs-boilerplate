<template lang="pug">
  v-layout
    v-flex
      v-card
        span(v-if='profile')
          v-card-title {{ profile.firstName }} {{ profile.lastName }}
          v-card-text {{ profile.email }}
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import { useResult } from "@vue/apollo-composable";
import { useGetProfileQuery } from "~/apollo/generated-operations";

export default defineComponent({
  name: "Profile",
  middleware: "auth",
  meta: {
    auth: true,
  },
  setup() {
    const { loading, result } = useGetProfileQuery();
    const profile = useResult(result);

    return {
      loading,
      profile,
    };
  },
});
</script>
