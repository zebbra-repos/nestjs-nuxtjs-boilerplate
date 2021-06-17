<template lang="pug">
  v-app
    my-notification
    h1(v-if='error.statusCode === 404') {{ $t('errors.not-found') }}
    h1(v-else='') {{ $t('errors.other') }}
    nuxt-link(to='/') {{ $t('errors.home') }}
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ErrorLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  head(this: any) {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 20px;
}
</style>
