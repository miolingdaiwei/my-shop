import type { OrderList } from "@/types/order";
import {
  getHandleClose,
  getHandleConfig,
  getHandleSend,
  orderList,
} from "@/untils/api/orderApi";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
export const useOrderListStore = defineStore({
  id: "order_list",
  state: () => ({
    tableData: [] as OrderList[], // 数据列表
    multipleSelection: [] as OrderList[], // 选中项
    total: 0, // 总条数
    currentPage: 1, // 当前页
    pageSize: 10, // 分页大小
    orderNo: "", // 订单号
    orderStatus: "", // 订单状态
  }),
  getters: {},
  actions: {
    async getOrderList() {
      const data = await orderList({
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.orderNo,
        orderStatus: this.orderStatus,
      });
      this.tableData = data.list as OrderList[];
      this.total = data.totalCount;
      this.currentPage = data.currPage;
    },

    async handleConfig(id?: number) {
      console.log("id", id);
      let params;
      if (id) {
        params = [id];
      } else {
        if (!this.multipleSelection.length) {
          console.log("state.multipleSelection", this.multipleSelection.length);
          ElMessage.error("请选择项");
          return;
        }
        console.log(this.multipleSelection);

        params = this.multipleSelection.map((i: OrderList) => i.orderId);
        console.log(this.multipleSelection);
      }
      getHandleConfig({ ids: params }).then(() => {
        ElMessage.success("配货成功");
        this.getOrderList();
        // renew data of order
      });
    },
    async handleSend(id?: number) {
      let params;
      if (id) {
        params = [id];
      } else {
        if (!this.multipleSelection.length) {
          ElMessage.error("请选择项");
          return;
        }
        params = this.multipleSelection.map((i: OrderList) => i.orderId);
      }
      getHandleSend({ ids: params }).then(() => {
        ElMessage.success("出库成功");
        this.getOrderList();
      });
    },
    async handleClose(id?: number) {
      let params;
      if (id) {
        params = [id];
      } else {
        if (!this.multipleSelection.length) {
          ElMessage.error("请选择项");
          return;
        }
        params = this.multipleSelection.map((i: OrderList) => i.orderId);
      }
      getHandleClose({ ids: params }).then(() => {
        ElMessage.success("关闭成功");
        this.getOrderList();
      });
    },
  },
});
