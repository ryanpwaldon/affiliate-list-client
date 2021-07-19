<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">The world's largest directory of<br />affiliate marketing programs.</div>
    <div class="flex w-full mt-16 space-x-8">
      <Filters class="sticky self-start w-1/4 top-8" @input="handleInput" />
      <div class="grid self-start w-full grid-cols-3 gap-8">
        <ProgramCard :key="i" :program="program" v-for="(program, i) in programs" />
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
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
export default defineComponent({
  components: {
    ProgramCard,
    Filters
  },
  setup() {
    const filters = ref()
    const programs = ref([] as any[])
    const page = usePageQuery()
    const allProgams = page.programs.edges.map((edge: any) => edge.node)
    const handleInput = (event: any) => (filters.value = event)
    watch(filters, () => (programs.value = filterPrograms(allProgams, filters.value)))
    return { handleInput, programs }
  }
})
</script>
