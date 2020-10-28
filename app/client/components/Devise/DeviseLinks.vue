<template lang="pug">
  v-menu(v-if='items.length' v-model='menu' open-on-hover)
    template(v-slot:activator='{ on }')
      v-btn(v-on='on' :input-value='menu' color='primary')
        | {{ $t('devise.shared.links.other-options') }}
        v-icon(right) mdi-menu-down
    v-list(color='primary')
      v-list-item(v-for='(item, i) in items' :key='i' nuxt :to='item[1]')
        v-list-item-title(v-text='$t(`devise.shared.links.${item[0]}`)')
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api";
import { globalStore } from "~/store";

export default defineComponent({
  name: "DeviceLinks",
  setup() {
    const { route } = useContext();

    const items = computed(() => {
      const result = [["sign-in", "/devise/sessions/new"]];

      if (globalStore.devise.registration) {
        result.push(["sign-up", "/devise/registrations/new"]);
      }

      if (globalStore.devise.password) {
        result.push(["forgot-your-password", "/devise/passwords/new"]);
      }

      if (globalStore.devise.confirmation) {
        result.push([
          "didn-t-receive-confirmation-instructions",
          "/devise/confirmations/new",
        ]);
      }

      if (globalStore.devise.unlock) {
        result.push([
          "didn-t-receive-unlock-instructions",
          "/devise/unlocks/new",
        ]);
      }

      return result;
    });

    return {
      menu: null,
      items: items.value.filter((item) => item[1] !== route.value.path),
    };
  },
});
</script>

<style lang="scss" scoped>
.v-btn--active .v-icon {
  transform: rotate(-180deg);
}
</style>
