import realRequest from "@/api/index";
import type { SwiperRes } from "@/types/swiper";
export const getSwipers = (params: object) => {
  return realRequest<SwiperRes>({
    method: "GET",
    url: `/carousels`,
    params,
  });
};

export const delSwipers = (ids: [number] | number[]) => {
  return realRequest({
    method: "DELETE",
    url: `/carousels`,
    data: {
      ids,
    },
  });
};
