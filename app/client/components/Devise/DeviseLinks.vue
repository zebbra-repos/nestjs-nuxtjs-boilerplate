<template lang="pug">
  v-menu(v-model='menu' open-on-hover)
    template(v-slot:activator='{ on }')
      v-btn(v-on='on' :input-value='menu' color='primary')
        | {{ $t('devise.shared.links.other-options') }}
        v-icon(right) mdi-menu-down
    v-list(color='primary')
      v-list-item(v-for='(item, i) in items' :key='i' nuxt :to='item[1]')
        v-list-item-title(v-text='$t(`devise.shared.links.${item[0]}`)')
</template>

<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "DeviceLinks",
  setup() {
    const { route } = useContext();

    const items = [
      ["sign-in", "/devise/sessions/new"],
      ["sign-up", "/devise/registrations/new"],
      ["forgot-your-password", "/devise/passwords/new"],
      ["didn-t-receive-confirmation-instructions", "/devise/confirmations/new"],
      ["didn-t-receive-unlock-instructions", "/devise/unlocks/new"],
    ].filter((item) => item[1] !== route.value.path);

    return {
      menu: null,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.v-btn--active .v-icon {
  transform: rotate(-180deg);
}
</style>
