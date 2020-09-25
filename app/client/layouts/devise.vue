<template lang="pug">
  v-app
    my-notification
    my-app-bar(compact)
    v-main
      v-container.d-flex.flex-fill.py-0(fluid)
        v-row.flex-fill
          v-col.d-none.d-sm-block.backdrop(cols='12' sm='4' md='6')
          v-col.py-0(cols='12' sm='8' md='6')
            nuxt
    my-footer
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "DeviseLayout",
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100%;

  .backdrop {
    background: var(--v-primary-base);
  }
}
</style>
