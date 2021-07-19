import { VueConstructor } from 'vue'

export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$unwrap = (edges: any[]) => edges.map(({ node }) => node)
  }
}
