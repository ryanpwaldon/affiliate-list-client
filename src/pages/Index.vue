<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">Find an affiliate program<br />that resonates with your audience.</div>
    <div class="mt-16">
      <p class="font-medium text-gray-500">Quick filters</p>
      <div class="flex mt-3 space-x-3">
        <Card class="flex-col items-start py-3 pl-6 pr-8">
          <p class="font-serif text-xs text-gray-500">Sort</p>
          <p>Newly added</p>
        </Card>
        <Card class="flex-col items-start py-3 pl-6 pr-8">
          <p class="font-serif text-xs text-gray-500">Category</p>
          <p>Software</p>
        </Card>
        <Card class="flex-col items-start py-3 pl-6 pr-8">
          <p class="font-serif text-xs text-gray-500">Category</p>
          <p>Fashion</p>
        </Card>
        <Card class="flex-col items-start py-3 pl-6 pr-8">
          <p class="font-serif text-xs text-gray-500">Payout model</p>
          <p>Revenue Share</p>
        </Card>
      </div>
    </div>
    <div class="grid w-full grid-cols-4 gap-8 mt-16">
      <Filters class="sticky self-start col-span-1 top-8" @input="handleInput" :total-results="total" />
      <div class="col-span-3">
        <div class="grid grid-cols-3 gap-8">
          <ProgramCard :key="i" :program="program" v-for="(program, i) in programs" />
        </div>
      </div>
    </div>
    <div class="grid w-full grid-cols-4 gap-8 mt-16">
      <div class="col-span-1" />
      <div class="col-span-3">
        <button class="flex items-center justify-center w-full py-3 font-medium border-t border-b border-gray-300 outline-none">
          Load more ↓
        </button>
        <h3 class="mt-16 font-serif text-2xl font-medium">Explore by category</h3>
        <div class="grid grid-cols-5 gap-8 mt-8">
          <Card>Ecommerce</Card>
          <Card>Software</Card>
          <Card>Fashion</Card>
          <Card>Food</Card>
          <Card>Travel</Card>
          <Card>Gaming</Card>
          <Card>Ecommerce</Card>
          <Card>Software</Card>
          <Card>Fashion</Card>
          <Card>Food</Card>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query {
    programs: allProgram {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
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
    }
  }
</page-query>

<script lang="ts">
import Card from '../components/Card.vue'
import Filters from '../components/Filters.vue'
import filterPrograms from '../utils/filter-programs'
import ProgramCard from '~/components/ProgramCard.vue'
import usePageQuery from '../composables/usePageQuery'
import { defineComponent, ref, watch } from '@vue/composition-api'
export default defineComponent({
  metaInfo: {
    title: 'The Worlds Largest Directory of Affiliate Marketing Programs'
  },
  components: {
    Card,
    ProgramCard,
    Filters
  },
  setup() {
    const total = ref(0)
    const filters = ref()
    const page = usePageQuery()
    const programs = ref([] as any[])
    const handleInput = (event: any) => (filters.value = event)
    const allProgams = page.programs.edges.map((edge: any) => edge.node)
    watch(filters, () => {
      const result = filterPrograms(allProgams, filters.value)
      total.value = result.total
      programs.value = result.programs
    })
    return { handleInput, programs, total }
  }
})
</script>
