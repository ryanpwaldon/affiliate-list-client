<template>
  <Layout max-width="max-w-5xl">
    <h1 class="mt-16 font-serif text-4xl font-medium">Affiliate program</h1>
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
          <Badge v-for="(category, i) in $page.program.categories" :key="i" :text="category.name" theme="white" />
        </div>
      </div>
    </div>
    <div class="w-full mt-5 border-b border-gray-300" />
    <div class="flex justify-between w-full mt-5">
      <div class="mr-32 space-y-6 whitespace-pre-line">
        <p>{{ $page.program.description }}</p>
        <div class="flex space-x-3">
          <a :href="$page.program.mainSite" target="_blank">
            <Button text="Visit homepage" theme="black" size="xs" />
          </a>
          <a :href="$page.program.affiliateSite" target="_blank">
            <Button text="Join affiliate program" theme="black" size="xs" />
          </a>
        </div>
      </div>
      <div class="flex-shrink-0 w-full max-w-xs space-y-3">
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-500">Payout structure</p>
          <Badge :text="$page.program.payoutStructure" theme="white" />
        </div>
        <div class="flex items-center justify-between" v-if="$page.program.commissionDisplay">
          <p class="font-medium text-gray-500">Commission</p>
          <Badge :text="$page.program.commissionDisplay" theme="white" />
        </div>
        <div class="flex items-center justify-between" v-if="$page.program.cookieDisplay">
          <p class="font-medium text-gray-500">Cookie duration</p>
          <Badge :text="$page.program.cookieDisplay" theme="white" />
        </div>
        <div class="flex items-center justify-between">
          <p class="font-medium text-gray-500">Affiliate network</p>
          <Badge :text="$page.program.affiliateNetwork.name" theme="white" />
        </div>
      </div>
    </div>
    <h3 class="mt-32 font-serif text-2xl font-medium">Similar programs</h3>
    <div class="grid grid-cols-3 gap-8 mt-8">
      <ProgramCard :key="i" :program="program" v-for="(program, i) in $page.program.categories[0].programs" />
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
    mainSite
    affiliateSite
    categories {
      name
      programs (limit: 3) {
        slug
        company
        excerpt
        createdAt
        categories {
          name
        }
        commissionDisplay
        commissionType
        payoutStructure
        cookieDisplay
        createdAt
        mainSite
        isNew
        logo {
          url
        }
      }
    }
    commissionDisplay
    commissionType
    payoutStructure
    cookieDisplay
    affiliateNetwork {
      name
    }
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
import usePageQuery from '../composables/usePageQuery'
import ProgramCard from '../components/ProgramCard.vue'
export default defineComponent({
  components: { Badge, Button, ProgramCard },
  metaInfo() {
    return {
      title: (this.$page as any).program.company
    }
  },
  setup() {
    const page = usePageQuery()
    console.log(page)
  }
})
</script>
