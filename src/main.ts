import qs from 'qs'
import '@/assets/css/main.css'
import VueRouter from 'vue-router'
import { MetaInfo } from 'vue-meta'
import { VueConstructor } from 'vue'
import unwrap from './plugins/unwrap'
import Layout from '@/layouts/Layout.vue'

export interface Context {
  appOptions: object
  router: VueRouter
  head: MetaInfo
}

export default (Vue: VueConstructor, { router }: Context) => {
  Vue.use(unwrap)
  Vue.component('Layout', Layout)
  router.options.parseQuery = string => qs.parse(string)
  router.options.stringifyQuery = object => {
    const string = qs.stringify(object)
    return string ? '?' + string : ''
  }
}
