export interface categoryInt {
  pageNumber: number;
  pageSize: number;
  categoryLevel: number;
  parentId: number;
}

export interface categoryRes {
  totalCount: number;
  pageSize: number;
  totalPage: number;
  currPage: number;
  list: categoryList[];
}
export interface categoryList {
  categoryId: number;
  categoryLevel: number;
  parentId: number;
  categoryName: string;
  categoryRank: number;
  isDeleted: number;
  createTime: string;
  createUser: number;
  updateTime: string;
  updateUser: number;
}
