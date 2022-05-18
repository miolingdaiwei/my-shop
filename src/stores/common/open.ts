import { defineStore } from "pinia";

export const useOpenStore = defineStore({
  id: "open",
  state: () => ({
    openMenu: false,
  }),
  getters: {
    getOpen(state) {
      return state.openMenu;
    },
  },
  actions: {
    changeOpenMenu() {
      this.openMenu = !this.openMenu;
    },
  },
});
