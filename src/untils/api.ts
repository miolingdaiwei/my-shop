import realRequest from "@/api/index";
import type { CStatus, GoodList, GoodReq } from "@/types/good/good";

export const adminLogin = (params: object) => {
  return realRequest({
    method: "POST",
    url: "/adminUser/login",
    data: params,
  });
};

export const getGoodList = (params: GoodReq) => {
  return realRequest<GoodList>({
    method: "GET",
    url: "/goods/list",
    params: params,
  });
};

export const getorder = () => {
  return realRequest({
    method: "GET",
    url: "/order",
  });
};

export const changeStatus = (arg: CStatus) => {
  return realRequest({
    method: "PUT",
    url: `/goods/status/${arg.status}`,
    data: arg.data,
  });
};
