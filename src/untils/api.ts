import realRequest from "@/api/index";
import type {
  AddGood,
  CStatus,
  GoodList,
  GoodReq,
  OneGood,
} from "@/types/good/good";
import type { Method } from "axios";

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

export const getOneGood = (id: number) => {
  return realRequest<OneGood>({
    method: "GET",
    url: `/goods/${id}`,
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCategory = (node: any) => {
  const { level = 0, value } = node;
  return realRequest({
    method: "GET",
    url: `/categories`,
    params: {
      pageNumber: 1,
      pageSize: 1000,
      categoryLevel: level + 1,
      parentId: value || 0,
    },
  });
};

// httpOption("/goods", params).then(() => {
//   ElMessage.success(id ? "修改成功" : "添加成功");
//   router.push({ path: "/good" });
// });
export const addChangeGood = (data: AddGood, method: Method) => {
  return realRequest({
    method,
    url: "/goods",
    data,
  });
};
