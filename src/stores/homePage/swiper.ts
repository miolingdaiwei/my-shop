import type { SwiperList, SwiperRes } from "@/types/swiper";
import { getSwipers } from "@/untils/api/swiperApi";
import { defineStore } from "pinia";

export const useSwiperStore = defineStore({
  id: "category",
  state: () => ({
    data: {
      totalCount: 0,
      pageSize: 10,
      totalPage: 0,
      currPage: 1,
      list: [] as SwiperList[],
    } as SwiperRes,
    id: 1,
    type: "add",
  }),
  getters: {},
  actions: {
    async carousels() {
      const data = await getSwipers({
        pageNumber: this.data.currPage,
        pageSize: this.data.pageSize,
      });
      this.data = data;
    },
    setType(type: string) {
      this.type = type;
    },
    setPage(page: number) {
      this.data.currPage = page;
    },
    setId(id: number) {
      this.id = id;
    },
  },
});
