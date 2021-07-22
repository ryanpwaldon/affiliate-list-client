import { getCurrentInstance } from '@vue/composition-api'

export default () => {
  const instance = getCurrentInstance()
  return (instance?.vnode.context as any).$page
}
