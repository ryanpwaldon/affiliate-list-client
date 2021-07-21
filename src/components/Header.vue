<template>
  <div class="w-screen h-16 px-5 bg-white border border-gray-200">
    <div class="flex items-center justify-between h-full m-auto text-gray-500 max-w-7xl">
      <div class="flex items-center space-x-7">
        <g-link class="flex space-x-2" to="/">
          <Logo />
          <p class="font-medium text-gray-800">Affiliate List</p>
        </g-link>
        <g-link to="/">Discover</g-link>
        <g-link to="/collections/">Collections</g-link>
        <g-link to="/blog/">Blog</g-link>
        <g-link to="/about/">Tools</g-link>
      </div>
      <div>
        <g-link to="/about/">List a Program →</g-link>
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
