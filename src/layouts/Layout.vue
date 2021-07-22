<template>
  <div>
    <Header />
    <div class="w-full px-8">
      <div :class="['m-auto', maxWidth]">
        <slot />
      </div>
    </div>
    <Footer class="mt-16" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
export default defineComponent({
  components: { Header, Footer },
  props: { maxWidth: { type: String, default: 'max-w-7xl' } }
})
</script>
