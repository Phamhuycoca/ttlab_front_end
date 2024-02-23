import router from '@/router';
import { defineStore } from 'pinia';

export const titleStore = defineStore({
  id: 'title',
  state: () => ({
    title: ''
  }),
  actions: {
    setTitle() {
      if (router.currentRoute.value.name === "product") {
        this.title = "Quản lý sản phẩm";
      }
      if (router.currentRoute.value.name === "user") {
        this.title = "Quản lý người dùng";
      }
    }
  }
});
