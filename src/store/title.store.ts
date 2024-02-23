import router from "@/router";
import { defineStore } from "pinia";

interface TitleState {
  title: string;
}

export const titleStore = defineStore("titleStore", {
  state: (): TitleState => ({
    title: ""
  }),
  actions: () => ({
    getTitle: function (this: TitleState) {
      if (router.currentRoute.value.name === "product") {
        this.title = "Quản lý sản phẩm";
      }
      if (router.currentRoute.value.name === "user") {
        this.title = "Quản lý người dùng";
      }
    }
  })
});
