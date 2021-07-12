<template lang="pug">
  v-layout
    v-flex
      v-card
        span(v-if='profile')
          v-card-title {{ profile.firstName }} {{ profile.lastName }}
          v-card-text {{ profile.email }}
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
} from "@nuxtjs/composition-api";
import { useResult } from "@vue/apollo-composable";
import {
  useGetProfileQuery,
  useOnUserAliveSubscription,
  usePingMutation,
} from "~/apollo/generated-operations";

export default defineComponent({
  name: "Profile",
  middleware: "auth",
  meta: {
    auth: true,
  },
  setup() {
    const { loading, result } = useGetProfileQuery();
    const profile = useResult(result);

    if (process.client) {
      const { onResult } = useOnUserAliveSubscription();
      onResult((result) => {
        console.log(result?.data?.userAlive.status);
      });
    }

    const { mutate: ping } = usePingMutation();
    let interval: NodeJS.Timer | undefined;
    onMounted(() => {
      if (process.client) {
        interval = setInterval(ping, 1000 * 5);
      }
    });
    onBeforeUnmount(() => {
      if (interval) {
        clearInterval(interval);
      }
    });

    return {
      loading,
      profile,
    };
  },
});
</script>
