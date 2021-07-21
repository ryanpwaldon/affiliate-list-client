<template>
  <form class="font-medium text-gray-500">
    <!-- <div class="py-2 mt-3 text-gray-500 border-b border-gray-300">
      <p><span class="text-red-600">All</span> affiliate programs</p>
    </div> -->
    <div class="py-2 mt-3 text-gray-800 border-b border-gray-300">
      <p>Sort by</p>
    </div>
    <Accordion :title="sortLabels.sortBy">
      <InputRadio class="pt-1 pb-3" :options="Object.values(sortByOptions)" name="sortBy" v-model="fields.sortBy.value" />
    </Accordion>
    <Accordion :title="sortLabels.sortOrder">
      <InputRadio class="pt-1 pb-3" :options="Object.values(sortOrderOptions)" name="sortOrder" v-model="fields.sortOrder.value" />
    </Accordion>
    <div class="py-2 mt-3 text-gray-800 border-b border-gray-300">
      <p>Filter by</p>
    </div>
    <Accordion title="Industry">
      <InputCheckbox class="pt-1 pb-3" :options="Object.values(categoriesOptions)" name="categories" v-model="fields.categories.value" />
    </Accordion>
    <Accordion title="Payout structure">
      <InputCheckbox
        class="pt-1 pb-3"
        :options="Object.values(payoutStructureOptions)"
        name="payoutStructure"
        v-model="fields.payoutStructures.value"
      />
    </Accordion>
    <Accordion title="Commission type">
      <InputCheckbox class="pt-1 pb-3" :options="Object.values(commissionTypeOptions)" name="commissionType" v-model="fields.commissionTypes.value" />
    </Accordion>
  </form>
</template>

<script lang="ts">
import Accordion from './Accordion.vue'
import InputRadio from './InputRadio.vue'
import { array, object, string } from 'yup'
import useForm from '../composables/useForm'
import useRoute from '../composables/useRoute'
import InputCheckbox from './InputCheckbox.vue'
import useRouter from '../composables/useRouter'
import { ref, computed, defineComponent, watch } from '@vue/composition-api'

const sortByOptions = {
  popularity: { label: 'Popularity', value: 'popularity' },
  dateAdded: { label: 'Date added', value: 'dateAdded' },
  commission: { label: 'Commission', value: 'commission' }
}

const sortOrderOptions = {
  desc: { label: 'Descending', value: 'desc' },
  asc: { label: 'Ascending', value: 'asc' }
}

const commissionTypeOptions = {
  Percent: { label: 'Percent', value: 'Percent' },
  Fixed: { label: 'Fixed', value: 'Fixed' }
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
  components: { Accordion, InputRadio, InputCheckbox },
  setup(_, { emit }) {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false)
    const query = computed(() => route.query as any)
    const updateQuery = (query: Record<string, any>) => router.push({ path: route.path, query })
    // prettier-ignore
    const schema = computed(() => object({
      page: string().default(query.value.page || undefined),
      sortBy: string().default(query.value.sortBy || sortByOptions.popularity.value).defined(),
      sortOrder: string().default(query.value.sortOrder || sortOrderOptions.desc.value).defined(),
      commissionTypes: array().default(query.value.commissionTypes || []),
      payoutStructures: array().default(query.value.payoutStructures || []),
      categories: array().default(query.value.categories || [])
    }))
    const { fields, values, modified } = useForm(schema)
    emit('input', values.value)
    const sortLabels = computed(() => ({
      sortBy: sortByOptions[values.value.sortBy as keyof typeof sortByOptions].label,
      sortOrder: sortOrderOptions[values.value.sortOrder as keyof typeof sortOrderOptions].label
    }))
    // prettier-ignore
    watch(values, () => {
      updateQuery(values.value)
      emit('input', values.value)
    })
    return {
      fields,
      loading,
      modified,
      sortLabels,
      sortByOptions,
      sortOrderOptions,
      categoriesOptions,
      commissionTypeOptions,
      payoutStructureOptions
    }
  }
})
</script>
