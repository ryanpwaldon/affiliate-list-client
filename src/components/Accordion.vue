<template>
  <div class="overflow-hidden border-b border-gray-300">
    <button type="button" class="flex justify-between w-full py-2 outline-none select-none" @click="open = !open">
      <p class="font-medium">{{ title }}</p>
      <ChevronDownIcon class="h-5 text-gray-400" />
    </button>
    <div ref="panel" class="transition-all ease-out" :style="{ maxHeight: panelHeight }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ChevronDownIcon } from '@vue-hero-icons/solid'
export default defineComponent({
  components: {
    ChevronDownIcon
  },
  props: {
    title: { type: String, required: true }
  },
  data: () => ({
    open: false
  }),
  computed: {
    panelHeight(): string {
      const panel = this.$refs.panel as Element
      return `${this.open ? panel.scrollHeight : 0}px`
    }
  }
})
</script>
