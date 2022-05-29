import { addSwiper, changeSwiper, getOneSwiper } from "@/untils/api/swiperApi";
import { localGet, uploadImgServer } from "@/untils/common";
import { defineStore } from "pinia";

export const useDialogSwiperStore = defineStore({
  id: "dialogSwiper",
  state: () => ({
    uploadImgServer,
    token: localGet("token") || "",
    visible: false,
    ruleForm: {
      url: "",
      link: "",
      sort: "",
    },
    rules: {
      url: [{ required: "true", message: "图片不能为空", trigger: ["change"] }],
      sort: [
        { required: "true", message: "排序不能为空", trigger: ["change"] },
      ],
    },
    id: 0,
  }),
  getters: {},
  actions: {
    async setSwiper() {
      const data = await getOneSwiper(this.id);
      this.ruleForm = {
        url: data.carouselUrl,
        link: data.redirectUrl,
        sort: data.carouselRank,
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleUrlSuccess(val: any) {
      this.ruleForm.url = val.data || "";
    },
    changeVisible() {
      this.visible = !this.visible;
    },
    async changeSwi() {
      await changeSwiper({
        carouselUrl: this.ruleForm.url,
        redirectUrl: this.ruleForm.link,
        carouselRank: this.ruleForm.sort,
      });
    },
    async addSwi() {
      await addSwiper({
        carouselId: this.id,
        carouselUrl: this.ruleForm.url,
        redirectUrl: this.ruleForm.link,
        carouselRank: this.ruleForm.sort,
      });
    },
    setId(id: number) {
      this.id = id;
    },
  },
});
