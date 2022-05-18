import realRequest from "@/api/index";
import type { AddGood, OneGood } from "@/types/good/good";
import type { Method } from "axios";

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

export const addChangeGood = (data: AddGood, method: Method) => {
  return realRequest({
    method,
    url: "/goods",
    data,
  });
};

export const getOneGood = (id: string) => {
  return realRequest<OneGood>({
    method: "GET",
    url: `/goods/${id}`,
  });
};
