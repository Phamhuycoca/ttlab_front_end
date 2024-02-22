import { defineStore } from 'pinia'

export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => ({
    loading: false
  }),
  actions: {
    openLoading(value:boolean) {
      this.loading = value
    }
  }
})
