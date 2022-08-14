import realRequest from "@/api/index";

export const orderList = (params: {
  pageNumber: number;
  pageSize: number;
  orderNo: string;
  orderStatus: string;
}) => {
  return realRequest({
    method: "GET",
    url: "/orders",
    params: params,
  });
};

export const getHandleConfig = (data: { ids: number[] }) => {
  return realRequest({
    method: "PUT",
    url: "/orders/checkDone",
    data,
  });
};
export const getHandleSend = (data: { ids: number[] }) => {
  return realRequest({
    method: "PUT",
    url: "/orders/checkOut",
    data,
  });
};

export const getHandleClose = (data: { ids: number[] }) => {
  return realRequest({
    method: "PUT",
    url: "/orders/close",
    data,
  });
};
