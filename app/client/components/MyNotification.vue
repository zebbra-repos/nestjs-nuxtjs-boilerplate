<template lang="pug">
  v-snackbar(
    v-if='show'
    bottom
    :value='notification.message'
    :timeout='notification.timeout'
    :color='notification.color'
    @input='faded'
  )
    | {{ notification.message }}
    template(v-slot:action='{ attrs }')
      v-btn(
        color='notification.color'
        text v-bind='attrs'
        @click='hide'
      ) {{ $t('notification.close') }}
</template>

<script lang="ts">
import { defineComponent, computed } from "@nuxtjs/composition-api";
import { notificationStore } from "~/store";

export default defineComponent({
  name: "MyNotification",
  setup() {
    function faded(visible: boolean) {
      if (!visible) {
        notificationStore.hide();
      }
    }

    function hide() {
      notificationStore.hide();
    }

    return {
      notification: computed(() => notificationStore.notification),
      show: computed(() => notificationStore.hasNotification),
      faded,
      hide,
    };
  },
});
</script>
