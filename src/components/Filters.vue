<template>
  <form class="font-medium text-gray-500">
    <div class="mt-3 text-gray-500">
      <p class="mb-2">Search summary</p>
      <div class="flex flex-wrap w-full flex-gap-1" v-if="searchSummary.length">
        <Badge :text="value" theme="white" v-for="(value, i) in searchSummary" :key="i" />
      </div>
      <Badge text="All Affiliate Programs" theme="white" v-else />
    </div>
    <div class="py-2 mt-3 border-b border-gray-300">
      <p>Sort by</p>
    </div>
    <Accordion :title="sortByLabel" class="text-gray-800">
      <InputRadio class="pt-1 pb-3" :options="Object.values(sortByOptions)" name="sortBy" v-model="fields.sortBy.value" />
    </Accordion>
    <div class="py-2 mt-3 border-b border-gray-300">
      <p>Filter by</p>
    </div>
    <Accordion title="Category" class="text-gray-800">
      <InputCheckbox class="pt-1 pb-3" :options="Object.values(categoriesOptions)" name="categories" v-model="fields.categories.value" />
    </Accordion>
    <Accordion title="Payout model" class="text-gray-800">
      <InputCheckbox
        class="pt-1 pb-3"
        :options="Object.values(payoutStructureOptions)"
        name="payoutStructure"
        v-model="fields.payoutStructures.value"
      />
    </Accordion>
    <div class="py-2 mt-3 text-gray-500">
      <p>Showing {{ totalResults }} results</p>
    </div>
  </form>
</template>

<script lang="ts">
import Badge from './Badge.vue'
import Accordion from './Accordion.vue'
import InputRadio from './InputRadio.vue'
import { array, object, string } from 'yup'
import useForm from '../composables/useForm'
import useRoute from '../composables/useRoute'
import InputCheckbox from './InputCheckbox.vue'
import useRouter from '../composables/useRouter'
import { ref, computed, defineComponent, watch } from '@vue/composition-api'

const sortByOptions = {
  mostPopular: { label: 'Most popular', value: 'mostPopular' },
  newlyAdded: { label: 'Newly added', value: 'newlyAdded' },
  highestCommission: { label: 'Highest commission', value: 'highestCommission' }
}

const payoutStructureOptions = {
  Recurring: { label: 'Recurring', value: 'Recurring' },
  'Per Sale': { label: 'Per Sale', value: 'Per Sale' },
  'Per Click': { label: 'Per Click', value: 'Per Click' }
}

const categoriesOptions = {
  Software: { label: 'Software', value: 'Software' },
  Ecommerce: { label: 'Ecommerce', value: 'Ecommerce' },
  'Clothing & Apparel': { label: 'Clothing & Apparel', value: 'Clothing & Apparel' },
  'Food & Beverage': { label: 'Food & Beverage', value: 'Food & Beverage' },
  Finance: { label: 'Finance', value: 'Finance' },
  Travel: { label: 'Travel', value: 'Travel' }
}

export default defineComponent({
  components: { Accordion, InputRadio, InputCheckbox, Badge },
  props: { totalResults: { type: String, required: true } },
  setup(_, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const query = computed(() => route.query as any)
    const updateQuery = (query: Record<string, any>) => router.push({ path: route.path, query })
    // prettier-ignore
    const schema = computed(() => object({
      page: string().default(query.value.page || undefined),
      sortBy: string().default(query.value.sortBy || sortByOptions.mostPopular.value).defined(),
      payoutStructures: array().default(query.value.payoutStructures || []),
      categories: array().default(query.value.categories || [])
    }))
    const { fields, values, modified } = useForm(schema)
    emit('input', values.value)
    const sortByLabel = computed(() => sortByOptions[values.value.sortBy as keyof typeof sortByOptions].label)
    const searchSummary = computed(() => [...(values.value.payoutStructures || []), ...(values.value.categories || [])])
    // prettier-ignore
    watch(values, () => {
      updateQuery(values.value)
      emit('input', values.value)
    })
    return {
      values,
      fields,
      loading,
      modified,
      sortByLabel,
      sortByOptions,
      searchSummary,
      categoriesOptions,
      payoutStructureOptions
    }
  }
})
</script>
