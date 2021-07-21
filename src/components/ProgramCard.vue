<template>
  <g-link
    :to="`/program/${program.id}/`"
    class="p-6 text-left bg-white border border-gray-300 rounded cursor-pointer select-none group hover:border-gray-800"
  >
    <div class="flex items-center w-full space-x-3">
      <div class="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden border border-gray-300 rounded-full">
        <div
          v-if="program.logo"
          class="w-full h-full bg-center bg-no-repeat bg-contain"
          :style="{ backgroundImage: `url(${program.logo[0].url})` }"
        />
        <div v-else class="font-serif text-4xl text-gray-800 leading-[29px] h-[26px]">{{ program.company[0] }}</div>
      </div>
      <div class="w-full">
        <div class="relative w-full font-medium">
          <p>{{ program.company }}</p>
        </div>
        <div class="flex mt-1 space-x-1">
          <Badge v-for="(category, i) in program.categories" :key="i" :text="category" theme="lightGray" />
        </div>
      </div>
    </div>
    <p class="mt-4 text-xs line-clamp-3">
      {{ program.description }}
    </p>
    <div class="mt-5 space-y-3 text-xs font-medium text-gray-500">
      <div class="flex justify-between">
        <p>Payout structure</p>
        <Badge :text="program.payoutStructure" />
      </div>
      <div class="flex justify-between">
        <p>Commission</p>
        <Badge :text="program.commission" />
      </div>
      <div class="flex justify-between">
        <p>Cookie duration</p>
        <Badge :text="program.cookieDuration" />
      </div>
    </div>
  </g-link>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import Badge from '~/components/Badge.vue'
export default defineComponent({
  components: { Badge },
  props: {
    program: {
      type: Object,
      required: true
    }
  }
})
</script>
