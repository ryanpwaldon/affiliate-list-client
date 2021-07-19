<template>
  <Layout>
    <div class="pt-16 font-serif text-4xl font-medium">The world's largest directory of<br />affiliate marketing programs.</div>
    <div class="flex w-full mt-16 space-x-8">
      <div class="grid self-start w-full grid-cols-3 gap-8">
        <ProgramCard :key="i" :program="program" v-for="(program, i) in $unwrap($page.programs.edges)" />
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
          logo {
            url
          }
        }
      }
    }
  }
</page-query>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ProgramCard from '~/components/ProgramCard.vue'
export default defineComponent({
  components: {
    ProgramCard
  }
})
</script>
