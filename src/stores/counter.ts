import { defineStore } from "pinia";
// import { getShopObj } from "@/api/sendCheckCode";

export const useShopCounter = defineStore({
  id: "shopCounter",
  state: () => ({
    ShopList: [],
  }),
  getters: {
    getCounter: (state) => state.ShopList,
  },
  actions: {
    // setCounter() {
    //   getShopObj().then((res) => {
    //     this.ShopList = res.data.shoplist;
    //   });
    // },
  },
});
