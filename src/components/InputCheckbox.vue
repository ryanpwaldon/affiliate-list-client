<template>
  <div class="space-y-2">
    <div class="flex items-center" v-for="(option, i) in options" :key="i">
      <input
        type="checkbox"
        :name="name"
        :id="option.value"
        @input="handleInput(option.value)"
        :checked="value.includes(option.value)"
        class="w-4 h-4 text-gray-800 transition duration-150 ease-in-out rounded outline-noneform-radio focus:ring-0 focus:ring-offset-0"
      />
      <label :for="option.value" class="ml-3">
        <span class="block text-sm font-medium leading-5 text-gray-800 select-none">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

interface CheckboxOption {
  label: string
  value: string
}

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<string[]>,
      required: true
    },
    options: {
      type: Array as PropType<CheckboxOption[]>,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const handleInput = (value: string) => {
      const checked = props.value.includes(value) ? (props.value as string[]).filter(item => item !== value) : [...(props.value as string[]), value]
      emit('input', checked)
    }
    return { handleInput }
  }
})
</script>
