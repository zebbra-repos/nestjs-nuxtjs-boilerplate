<template lang="pug">
  v-app-bar(:clipped-left='clipped' fixed app)
    span.d-none.d-md-block(v-if='!compact')
      v-app-bar-nav-icon(@click.stop='toggleDrawer')
      v-btn(icon @click.stop='toggleMiniVariant')
        v-icon(
          v-if='miniVariant'
        ) mdi-{{ &grave;chevron-${&quot;right&quot;}&grave; }}
        v-icon(v-else) mdi-{{ &grave;chevron-${&quot;left&quot;}&grave; }}
      v-btn(icon @click.stop='toggleClipped')
        v-icon mdi-application
      v-btn(icon @click.stop='toggleFixed')
        v-icon mdi-minus
    router-link(to='/')
      v-toolbar-title(v-text='title')
    v-spacer
    my-lang-switcher
    my-session(v-if='!compact')
</template>

<script lang="ts">
import { computed, defineComponent } from "@nuxtjs/composition-api";
import { appBarStore } from "~/store";

export default defineComponent({
  name: "MyAppBar",
  props: {
    compact: Boolean,
  },
  setup() {
    return {
      clipped: computed(() => appBarStore.clipped),
      miniVariant: computed(() => appBarStore.miniVariant),
      toggleClipped: appBarStore.toggleClipped,
      toggleDrawer: appBarStore.toggleDrawer,
      toggleFixed: appBarStore.toggleFixed,
      toggleMiniVariant: appBarStore.toggleMiniVariant,
      title: "Vuetify.js",
    };
  },
});
</script>

<style lang="scss" scoped>
.nuxt-link-active {
  color: inherit;
  text-decoration: none;
}
</style>
