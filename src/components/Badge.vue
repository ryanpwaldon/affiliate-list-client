<template>
  <span class="inline-flex items-center whitespace-nowrap" :class="[sizeClasses, themeClasses]">
    {{ text }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    size: { type: String, default: 'sm' },
    text: { type: [String, Number], required: true },
    theme: { type: String, default: 'gray' }
  },
  setup(props) {
    const sizeClasses = {
      sm: 'px-2 py-1 rounded-sm text-xs font-medium',
      lg: 'px-2.5 py-0.5 rounded-md text-sm font-medium'
    }[props.size]
    // prettier-ignore
    const themeClasses = computed(() => ({
      lightGray: 'bg-gray-100 text-gray-500',
      lightWhite: 'bg-white text-gray-500',
      white: 'bg-white text-gray-800 border border-gray-200',
      gray: 'bg-gray-50 text-gray-800 border border-gray-200',
      red: 'bg-red-50 text-red-800 border border-red-200',
      orange: 'bg-orange-100 text-orange-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      green: 'bg-green-100 text-green-800',
      teal: 'bg-teal-100 text-teal-800',
      blue: 'bg-blue-100 text-blue-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      purple: 'bg-purple-100 text-purple-800',
      pink: 'bg-pink-100 text-pink-800'
    }[props.theme]))
    return { sizeClasses, themeClasses }
  }
})
</script>
