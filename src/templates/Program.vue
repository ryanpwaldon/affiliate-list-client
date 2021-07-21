<template>
  <Layout max-width="max-w-5xl">
    <h1 class="mt-16 font-serif text-4xl font-medium text-gray-500">Affiliate program</h1>
    <div class="flex items-center w-full mt-16 space-x-3">
      <div class="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden border border-gray-300 rounded-full">
        <div
          v-if="$page.program.logo"
          class="w-full h-full bg-center bg-no-repeat bg-contain"
          :style="{ backgroundImage: `url(${$page.program.logo[0].url})` }"
        />
        <div v-else class="font-serif text-4xl text-gray-800 leading-[29px] h-[26px]">{{ $page.program.company[0] }}</div>
      </div>
      <div class="w-full">
        <div class="relative w-full font-medium">
          <p>{{ $page.program.company }}</p>
        </div>
        <div class="flex mt-1 space-x-1">
          <Badge v-for="(category, i) in $page.program.categories" :key="i" :text="category" theme="lightWhite" />
        </div>
      </div>
    </div>
    <div class="w-full mt-5 border-b border-gray-300" />
    <div class="flex justify-between w-full mt-5">
      <div class="mr-32 space-y-6 whitespace-pre-line">
        <p>{{ $page.program.description }}</p>
        <div class="flex space-x-3">
          <Button text="Visit homepage" theme="black" size="xs" />
          <Button text="Join affiliate program" theme="black" size="xs" />
        </div>
      </div>
      <div class="flex-shrink-0 w-full max-w-xs space-y-3">
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-500">Payout structure</p>
          <Badge :text="$page.program.payoutStructure" theme="white" />
        </div>
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-500">Commission</p>
          <Badge :text="$page.program.commission" theme="white" />
        </div>
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-500">Cookie duration</p>
          <Badge :text="$page.program.cookieDuration" theme="white" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  program(id: $id) {
    id
    company
    description
    createdAt
    categories
    commission
    commissionType
    payoutStructure
    cookieDuration
    createdAt
    logo {
      url
    }
  }
}
</page-query>

<script lang="ts">
import Badge from '../components/Badge.vue'
import Button from '../components/Button.vue'
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  components: { Badge, Button },
  metaInfo() {
    return {
      title: (this.$page as any).program.company
    }
  }
})
</script>
