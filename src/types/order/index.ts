export interface OrderListApi {
  pageNumber: string;
  pageSize: string;
  orderNo: string;
  orderStatus: string;
}

export interface OrderList {
  createTime: string;
  extraInfo: string;
  isDeleted: number;
  orderId: number;
  orderNo: string;
  orderStatus: number;
  payStatus: number;
  payTime: object;
  payType: number;
  totalPrice: number;
  updateTime: string;
  userId: number;
}
