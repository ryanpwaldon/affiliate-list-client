<template>
  <g-link
    :to="`/program/${program.slug}/`"
    class="relative p-6 text-left bg-white border border-gray-200 rounded-sm cursor-pointer select-none group hover:bg-gray-50"
  >
    <a :href="program.mainSite" target="_blank" class="box-content absolute top-0 right-0 hidden p-2 group-hover:block" @click.stop>
      <Outlink class="w-[10px] h-[10px]" />
    </a>
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
        <div class="relative w-full mb-1 font-medium">
          <p>{{ program.company }}</p>
        </div>
        <div class="flex flex-wrap overflow-hidden h-[30px] flex-gap-1">
          <Badge v-if="program.isNew" text="New" theme="red" />
          <Badge v-for="(category, i) in program.categories" :key="i" :text="category.name" theme="gray" />
        </div>
      </div>
    </div>
    <p class="mt-4 text-xs line-clamp-3">
      {{ program.excerpt }}
    </p>
    <div class="mt-5 space-y-3 text-xs font-medium text-gray-500">
      <div class="flex justify-between">
        <p>Commission</p>
        <Badge :text="program.commissionDisplay" />
      </div>
      <div class="flex justify-between">
        <p>Payout structure</p>
        <Badge :text="program.payoutStructure" />
      </div>
      <div class="flex justify-between" v-if="program.cookieDisplay">
        <p>Cookie duration</p>
        <Badge :text="program.cookieDisplay" />
      </div>
    </div>
  </g-link>
</template>

<script lang="ts">
import Badge from '~/components/Badge.vue'
import Outlink from '../icons/Outlink.vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { Badge, Outlink },
  props: {
    program: {
      type: Object,
      required: true
    }
  }
})
</script>
