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
export const getOneSwiper = (id: number) => {
  return realRequest({
    method: "GET",
    url: `/carousels/${id}`,
  });
};

export const changeSwiper = (data: object) => {
  return realRequest({
    method: "POST",
    url: `/carousels`,
    data,
  });
};
export const addSwiper = (data: object) => {
  return realRequest({
    method: "PUT",
    url: `/carousels`,
    data,
  });
};
