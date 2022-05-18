import type { Glist, GoodCategory, OneGood } from "@/types/good/good";
import { getOneGood } from "@/untils/api/addGoodApi";
import { defineStore } from "pinia";

export const useProductStore = defineStore({
  id: "addGoods",
  state: (): OneGood => ({
    goods: {
      createTime: "",
      createUser: 0,
      goodsCarousel: "",
      goodsCategoryId: 0,
      goodsCoverImg: "",
      goodsDetailContent: "",
      goodsId: "",
      goodsIntro: "",
      goodsName: "",
      goodsSellStatus: 0,
      originalPrice: 0,
      sellingPrice: 0,
      stockNum: 0,
      tag: "",
      updateTime: "",
      updateUser: 0,
    } as Glist,
    firstCategory: null as unknown as GoodCategory,
    secondCategory: null as unknown as GoodCategory,
    thirdCategory: null as unknown as GoodCategory,
  }),
  getters: {
    getCode(state): string {
      return this.firstCategory
        ? `${state.firstCategory.categoryName}/${state.secondCategory.categoryName}/${state.thirdCategory.categoryName}`
        : "";
    },
  },
  actions: {
    async getterGood(id: string) {
      const data = await getOneGood(id);
      this.goods = data.goods;
      this.firstCategory = data.firstCategory;
      this.secondCategory = data.secondCategory;
      this.thirdCategory = data.thirdCategory;
    },
    handleChangeCate(val: number[]) {
      console.log(val);
      this.goods.goodsCategoryId = val[2] || 0;
    },
  },
});
