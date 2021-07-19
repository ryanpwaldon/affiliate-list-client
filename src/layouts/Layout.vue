<template>
  <div>
    <Header />
    <div class="w-full px-5">
      <div class="m-auto max-w-7xl">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Header from '../components/Header.vue'
export default defineComponent({
  components: { Header }
})
</script>
