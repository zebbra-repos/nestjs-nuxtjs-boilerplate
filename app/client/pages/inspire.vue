<template lang="pug">
  v-layout
    v-flex.text-center
      img.mb-5(src='/v.png' alt='Vuetify.js')
      blockquote.blockquote
        | &ldquo;First, solve the problem. Then, write the code.&rdquo;
        footer
          small
            em &mdash;John Johnson
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Inspire",
});
</script>
