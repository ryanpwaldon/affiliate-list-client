<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">The world's largest directory of<br />affiliate marketing programs.</div>
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
          <CategoryCard>Ecommerce</CategoryCard>
          <CategoryCard>Software</CategoryCard>
          <CategoryCard>Fashion</CategoryCard>
          <CategoryCard>Food</CategoryCard>
          <CategoryCard>Travel</CategoryCard>
          <CategoryCard>Gaming</CategoryCard>
          <CategoryCard>Ecommerce</CategoryCard>
          <CategoryCard>Software</CategoryCard>
          <CategoryCard>Fashion</CategoryCard>
          <CategoryCard>Food</CategoryCard>
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
import CategoryCard from '../components/CategoryCard.vue'
export default defineComponent({
  metaInfo: {
    title: 'The Worlds Largest Directory of Affiliate Marketing Programs'
  },
  components: {
    CategoryCard,
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
