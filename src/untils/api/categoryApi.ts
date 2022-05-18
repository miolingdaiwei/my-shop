import realRequest from "@/api/index";
import type { categoryInt, categoryRes } from "@/types/category";
import type { Method } from "axios";

export const getorder = () => {
  return realRequest({
    method: "GET",
    url: "/order",
  });
};

export const category = (params: categoryInt) => {
  return realRequest<categoryRes>({
    method: "GET",
    url: "/categories",
    params,
  });
};

export const delCategory = (data: { id: [number] } | { ids: number[] }) => {
  return realRequest({
    method: "DELETE",
    url: "/categories",
    data,
  });
};

export const myGetDetail = (id: number) => {
  return realRequest({
    method: "GET",
    url: `/categories/${id}`,
  });
};

export const addCategory = (data: object, method: Method) => {
  return realRequest({
    method,
    url: `/categories`,
    data,
  });
};
