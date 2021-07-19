import VueRouter from 'vue-router'
import { getCurrentInstance } from '@vue/composition-api'

export default () => {
  const instance = getCurrentInstance()
  return instance?.root.proxy.$router as VueRouter
}
