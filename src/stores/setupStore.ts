import { defineStore } from "pinia";

export const useSetupStore = defineStore("setupStore", () => {
  let a = "ss";
  const add = () => {
    a += "s";
  };
  return {
    a,
    add,
  };
});
