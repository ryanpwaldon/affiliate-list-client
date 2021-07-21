<template>
  <div class="w-full py-2"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
export default defineComponent({
  props: {
    page: { type: Number, default: 1 },
    totalPages: { type: Number, required: true }
  },
  setup(props) {
    const showFirstPage = computed(() => props.page !== 1)
    const showLastPage = computed(() => props.page !== props.totalPages)
  }
})
</script>
