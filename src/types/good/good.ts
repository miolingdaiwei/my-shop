export interface GoodReq {
  pageNumber: number;
  pageSize: number;
}

export interface Glist {
  createTime?: string;
  createUser?: number;
  goodsCarousel?: string;
  goodsCategoryId?: number;
  goodsCoverImg?: string;
  goodsDetailContent?: null | string | object;
  goodsId?: number;
  goodsIntro?: string;
  goodsName?: string;
  goodsSellStatus?: number;
  originalPrice?: number;
  sellingPrice?: number;
  stockNum?: number;
  tag?: string;
  updateTime?: string;
  updateUser?: number;
}

export interface GoodList {
  currPage: number;
  list: Glist[];
  pageSize: number;
  totalCount: number;
  totalPage: number;
}

export interface CStatus {
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ids: [] | [any];
  };
  status: number;
}
