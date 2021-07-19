import qs from 'qs'
import '@/assets/css/main.css'
import Layout from '@/layouts/Layout.vue'
import VueUnwrap from './plugins/VueUnwrap'
import { ClientApiConstructor } from './types'

const client: ClientApiConstructor = (Vue, { router }) => {
  Vue.use(VueUnwrap)
  Vue.component('Layout', Layout)
  router.options.parseQuery = string => qs.parse(string)
  router.options.stringifyQuery = object => {
    const string = qs.stringify(object)
    return string ? '?' + string : ''
  }
}

export default client
