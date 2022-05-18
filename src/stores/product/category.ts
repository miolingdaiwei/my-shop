import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    visible: false,
    id: 0,
    categoryLevel: 1,
    parentId: 0,
    ruleForm: {
      name: "",
      rank: "",
    },
  }),
  getters: {
    postData(state) {
      return {
        categoryLevel: state.categoryLevel,
        parentId: state.parentId,
        categoryName: state.ruleForm.name,
        categoryRank: state.ruleForm.rank,
      };
    },
    putData(state) {
      return {
        categoryId: state.id,
        categoryLevel: state.categoryLevel,
        parentId: state.parentId,
        categoryName: state.ruleForm.name,
        categoryRank: state.ruleForm.rank,
      };
    },
  },
  actions: {
    setOpen() {
      this.visible = !this.visible;
    },
    setId(id: number) {
      this.id = id;
    },
    outId() {
      this.id = 0;
    },
    setDetail(n1: number, n2: number) {
      (this.parentId = n1), (this.categoryLevel = n2);
    },
    setFrom(s1: string, s2: string) {
      this.ruleForm = {
        name: s1,
        rank: s2,
      };
    },
  },
});
