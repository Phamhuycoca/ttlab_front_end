import { defineStore } from "pinia";
interface loadingStore {
  loading: boolean;
}
export const useLoadingStore = defineStore('loadingStore', {
  state: (): loadingStore => ({
    loading: false
  }),
  getters:{
    getloading: (state)=>state.loading
  },
  actions: {
    openLoading: function (loading: boolean) {
      this.loading = loading;
    },
    closeLoading: function (loading: boolean) {
      this.loading = loading;
    }
  }
});