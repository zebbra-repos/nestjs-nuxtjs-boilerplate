<template lang="pug">
  v-app
    my-notification
    h1(v-if='error.statusCode === 404') {{ pageNotFound }}
    h1(v-else='') {{ otherError }}
    nuxt-link(to='/') Home page 
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  layout: "empty",
  name: "ErrorLayout",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
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
