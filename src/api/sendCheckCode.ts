import realRequest from "@/api/index";
import type { ListRes, OrderRes } from "@/types/shopObj/shopObj";
import type { userRes } from "@/types/user/user";

export const checkLogin = () => {
  return realRequest<userRes>({
    method: "GET",
    url: "/login",
  });
};

// export const getShopObj = () => {
//   return realRequest<ShopRes>({
//     method: "GET",
//     url: "/shop",
//   });
// };

export const getShopObj2 = () => {
  return realRequest<ListRes>({
    method: "GET",
    url: "/shop",
  });
};

export const getorder = () => {
  return realRequest<OrderRes>({
    method: "GET",
    url: "/order",
  });
};
