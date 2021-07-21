<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">The world's largest directory of<br />affiliate marketing programs.</div>
    <div class="flex w-full mt-16 mb-16 space-x-8">
      <Filters class="sticky self-start w-1/4 top-8" @input="handleInput" :total-results="total" />
      <div class="self-start w-full ">
        <div class="grid grid-cols-3 gap-8">
          <ProgramCard :key="i" :program="program" v-for="(program, i) in programs" />
        </div>
        <button class="flex items-center justify-center w-full py-3 mt-16 font-medium border-t border-b border-gray-300 outline-none">
          Load more ↓
        </button>
        <h3 class="mt-16 font-serif text-2xl font-medium">Explore by category</h3>
        <div class="grid grid-cols-5 gap-8 mt-8">
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Ecommerce</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Software</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Fashion</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Food</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Travel</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Gaming</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Ecommerce</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Software</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Fashion</div>
          <div class="flex items-center justify-center py-5 font-serif text-lg bg-white border border-gray-200 rounded-sm">Food</div>
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
