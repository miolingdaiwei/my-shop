import { defineStore } from "pinia";

export const useUsernameStore = defineStore({
  id: "username",
  state: () => ({
    username: "",
  }),
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
