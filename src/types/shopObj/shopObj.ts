export interface ShopList {
  shoplist: [
    {
      shopname: string;
      price: number;
      count: string;
    }
  ];
}

export interface ListRes<T = ShopList> {
  success: boolean;
  data: T;
}

export interface OrderObj {
  ordernumber: number;
  ordername: string;
  allmoney: number;
  delivered: boolean;
  shop: [
    {
      shopname: string;
      shopprice: number;
      count: number;
    }
  ];
}

export interface OrderList {
  orderlist: OrderObj[];
}

export interface OrderRes<T = OrderList> {
  success: boolean;
  data: T;
}
