export interface GoodReq {
  pageNumber: number;
  pageSize: number;
}

export interface Glist {
  createTime: string;
  createUser: number;
  goodsCarousel: string;
  goodsCategoryId: number;
  goodsCoverImg: string;
  goodsDetailContent: string;
  goodsId: number;
  goodsIntro: string;
  goodsName: string;
  goodsSellStatus: number;
  originalPrice: number;
  sellingPrice: number;
  stockNum: number;
  tag: string;
  updateTime: string;
  updateUser: number;
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

export interface GoodCategory {
  categoryId: number;
  categoryLevel: number;
  categoryName: string;
  categoryRank: number;
  createTime: string;
  createUser: number;
  isDeleted: number;
  parentId: number;
  updateTime: string;
  updateUser: number;
}

export interface OneGood {
  firstCategory: GoodCategory;
  goods: Glist;
  secondCategory: GoodCategory;
  thirdCategory: GoodCategory;
}

export interface AddGood {
  goodsCategoryId: number;
  goodsCoverImg: string;
  goodsDetailContent: string;
  goodsIntro: string;
  goodsName: string;
  goodsSellStatus: number;
  originalPrice: number;
  sellingPrice: number;
  stockNum: number;
  tag: string;
  goodsId?: string;
}
