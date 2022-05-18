import type { Glist, GoodList } from "@/types/good/good";
import { getGoodList } from "@/untils/api/productApi";
import { defineStore } from "pinia";

export const useProductStore = defineStore({
  id: "shopCounter",
  state: (): GoodList => ({
    list: [] as Glist[], // 数据列表
    totalCount: 0, // 总条数
    currPage: 1, // 当前页
    pageSize: 10, // 分页大小
    totalPage: 1,
  }),
  getters: {},
  actions: {
    async getterGood() {
      const data = await getGoodList({
        pageNumber: this.currPage,
        pageSize: this.pageSize,
      });
      this.list = data.list;
      this.currPage = data.currPage;
      this.pageSize = data.pageSize;
      this.totalPage = data.totalCount;
      this.totalCount = data.totalCount;
    },
    changePage(val: number) {
      this.currPage = val;
      this.getterGood();
    },
  },
});
