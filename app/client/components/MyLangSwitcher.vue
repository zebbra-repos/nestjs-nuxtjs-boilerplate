<template lang="pug">
  v-menu(v-model='menu' open-on-hover)
    template(v-slot:activator='{ on }')
      v-btn.mr-2(v-on='on' :input-value='menu' color='primary')
        | {{ locale }}
        v-icon(right) mdi-menu-down
    v-list(color='primary')
      v-list-item(
        v-for='(locale, i) in availableLocales'
        :key='locale.code'
        link
        @click.prevent.stop='setLocale(locale.code)'
      )
        v-list-item-title(v-text='locale.code.toUpperCase()')
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "MyLangSwitcher",
  setup() {
    const {
      app: { i18n },
    } = useContext();

    return {
      menu: null,
      locale: computed(() => i18n.locale),
      setLocale: i18n.setLocale,
      availableLocales: computed(() =>
        (i18n.locales as any[]).filter((i) => i.code !== i18n.locale),
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.v-btn--active .v-icon {
  transform: rotate(-180deg);
}
</style>
