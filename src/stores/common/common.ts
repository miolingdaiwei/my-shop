import { defineStore } from "pinia";
export const useUsernameStore = defineStore({
  id: "username",
  state: () => ({
    username: "",
  }),
  persist: {
    enabled: true, // 启用
    strategies: [
      // storage 可选localStorage或sessionStorage
      // paths 给指定数据持久化
      { key: "user", storage: localStorage },
    ],
  },
  getters: {
    getUsername(state) {
      return state.username;
    },
  },
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    exitUsername() {
      this.username = "";
    },
  },
});
