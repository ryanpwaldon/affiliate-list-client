<template>
  <div class="w-screen h-16 px-5 bg-white border-b border-gray-200">
    <div class="flex items-center justify-between h-full m-auto max-w-7xl">
      <div class="flex items-center">
        <Logo />
      </div>
      <div>
        <g-link to="/about/" class="font-medium">List a Program →</g-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from '~/components/Logo.vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { Logo }
})
</script>
