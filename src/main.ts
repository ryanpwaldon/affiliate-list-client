import { ClientApiConstructor } from './types'
import VueUnwrap from './plugins/VueUnwrap'
import Layout from '@/layouts/Layout.vue'
import '@/assets/css/tailwind.css'

const client: ClientApiConstructor = Vue => {
  Vue.use(VueUnwrap)
  Vue.component('Layout', Layout)
}

export default client
