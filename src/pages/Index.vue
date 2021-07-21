<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">The world's largest directory of<br />affiliate marketing programs.</div>
    <div class="flex w-full mt-16 mb-16 space-x-8">
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
    const filters = ref()
    const page = usePageQuery()
    const programs = ref([] as any[])
    const handleInput = (event: any) => (filters.value = event)
    const allProgams = page.programs.edges.map((edge: any) => edge.node)
    watch(filters, () => (programs.value = filterPrograms(allProgams, filters.value)))
    return { handleInput, programs }
  }
})
</script>
