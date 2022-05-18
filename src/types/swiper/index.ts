export interface SwiperRes {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  list: SwiperList[];
}

export interface SwiperList {
  carouselId: number;
  carouselUrl: string;
  redirectUrl: string;
  carouselRank: number;
  isDeleted: number;
  createTime: string;
  createUser: string;
  updateTime: string;
  updateUser: string;
}
