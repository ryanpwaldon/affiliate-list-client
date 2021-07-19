<template>
  <div class="space-y-2">
    <div class="flex items-center" v-for="(option, i) in options" :key="i">
      <input
        type="radio"
        :name="name"
        :id="option.value"
        :value="option.value"
        :checked="value === option.value"
        @input="$emit('input', $event.target.value)"
        class="w-4 h-4 text-gray-800 transition duration-150 ease-in-out outline-noneform-radio focus:ring-0 focus:ring-offset-0"
      />
      <label :for="option.value" class="ml-3">
        <span class="block text-sm font-medium leading-5 text-gray-800 select-none">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface RadioOption {
  label: string
  value: string
}

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<RadioOption[]>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
