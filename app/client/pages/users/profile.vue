<template lang="pug">
  v-layout
    v-flex
      v-card
        v-card-title(v-if='loading') {{ $t('profile.loading') }}
        span(v-else-if='profile')
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
