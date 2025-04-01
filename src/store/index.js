import { createPinia, defineStore } from 'pinia'

const pinia = createPinia()

export default pinia

// 示例store
export const useMainStore = defineStore('main', {
  state: () => ({
    name: 'UHappyOK'
  })
})