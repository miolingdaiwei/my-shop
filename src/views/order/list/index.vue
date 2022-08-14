<template>
  <el-card class="order-container">
    <template #header>
      <div class="header">
        <el-input
          style="width: 200px; margin-right: 10px"
          placeholder="请输入订单号"
          v-model="store.orderNo"
          @change="handleOption"
          size="small"
          clearable
        />
        <el-select
          @change="handleOption"
          v-model="store.orderStatus"
          size="small"
          style="width: 200px; margin-right: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button type="primary" size="small" icon="el-icon-edit"
          >修改订单</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-s-home"
          @click="store.handleConfig()"
          >配货完成</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-s-home"
          @click="store.handleSend()"
          >出库</el-button
        >
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="store.handleClose()"
          >关闭订单</el-button
        >
      </div>
    </template>
    <el-table
      v-loading="loading"
      :data="store.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="orderNo" label="订单号"> </el-table-column>
      <el-table-column prop="totalPrice" label="订单总价"> </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态">
        <template #default="scope">
          <span
            >{{ orderStatus[scope.row.orderStatus as sta] || "未知状态" }}</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="payType" label="支付方式">
        <template #default="scope">
          <span v-if="scope.row.payType == 1">微信支付</span>
          <span v-else-if="scope.row.payType == 2">支付宝支付</span>
          <span v-else>未支付</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-popconfirm
            v-if="scope.row.orderStatus == 1"
            title="确定配货完成吗？"
            @confirm="store.handleConfig(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">配货完成</a>
            </template>
          </el-popconfirm>
          <el-popconfirm
            v-if="scope.row.orderStatus == 2"
            title="确定出库吗？"
            @confirm="store.handleSend(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">出库</a>
            </template>
          </el-popconfirm>

          <el-popconfirm
            v-if="!(scope.row.orderStatus == 4 || scope.row.orderStatus < 0)"
            title="确定关闭订单吗？"
            @confirm="store.handleClose(scope.row.orderId)"
          >
            <template #reference>
              <a style="cursor: pointer; margin-right: 10px">关闭订单</a>
            </template>
          </el-popconfirm>
          <router-link
            :to="{ path: '/product', query: { id: scope.row.orderId } }"
            >订单详情</router-link
          >
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="store.total"
      :page-size="store.pageSize"
      :current-page="store.currentPage"
      @current-change="changePage"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useOrderListStore } from "@/stores/order/list";
import type { OrderList } from "@/types/order";
const store = useOrderListStore();
const loading = ref(false);
const options = [
  {
    value: "",
    label: "全部",
  },
  {
    value: 0,
    label: "待支付",
  },
  {
    value: 1,
    label: "已支付",
  },
  {
    value: 2,
    label: "配货完成",
  },
  {
    value: 3,
    label: "出库成功",
  },
  {
    value: 4,
    label: "交易成功",
  },
  {
    value: -1,
    label: "手动关闭",
  },
  {
    value: -2,
    label: "超时关闭",
  },
  {
    value: -3,
    label: "商家关闭",
  },
];

type sta = 0 | 1 | 2 | 3 | 4 | "-1" | "-1" | "-3";
// the index of status

const orderStatus = {
  0: "待支付",
  1: "已支付",
  2: "配货完成",
  3: "出库成功",
  4: "交易成功",
  "-1": "手动关闭",
  "-2": "超时关闭",
  "-3": "商家关闭",
};

onMounted(() => {
  loading.value = true;
  store.getOrderList().then(() => {
    loading.value = false;
  });
});
// 获取轮播图列表
const handleOption = () => {
  loading.value = true;
  store.currentPage = 1;
  store.getOrderList().then(() => {
    loading.value = false;
  });
};
// 选择项
const handleSelectionChange = (val: OrderList[]) => {
  store.multipleSelection = val;
};
const changePage = (val: number) => {
  loading.value = true;
  store.currentPage = val;
  store.getOrderList().then(() => {
    loading.value = false;
  });
};
</script>

<style scoped>
.order-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>
