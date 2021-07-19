import { getCurrentInstance } from '@vue/composition-api'

export default () => {
  const instance = getCurrentInstance()
  return (instance?.root.proxy as any).$page
}
