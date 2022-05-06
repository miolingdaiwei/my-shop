import { defineStore } from "pinia";

export const usePhone = defineStore({
  id: "phone",
  state: () => ({
    phoneNumber: "",
  }),
  getters: {
    getPhone(state) {
      return state.phoneNumber;
    },
  },
  actions: {
    setPhone(num: string) {
      this.phoneNumber = num;
    },
  },
});
