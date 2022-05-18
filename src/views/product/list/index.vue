/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <el-button type="primary" class="el-btn" @click="addProduct"
    >添加商品</el-button
  >
  <el-table v-loading="loading" :data="store.list" style="width: 100%">
    <el-table-column prop="goodsId" label="商品编号"> </el-table-column>
    <el-table-column prop="goodsName" label="商品名"> </el-table-column>
    <el-table-column prop="goodsIntro" label="商品简介"> </el-table-column>
    <el-table-column label="商品图片" width="150px">
      <template #default="scope">
        <img
          style="width: 100px; height: 100px"
          :key="scope.row.goodsId"
          :src="scope.row.goodsCoverImg"
          alt="商品主图"
        />
      </template>
    </el-table-column>
    <el-table-column prop="stockNum" label="商品库存"> </el-table-column>
    <el-table-column prop="sellingPrice" label="商品售价"> </el-table-column>
    <el-table-column label="上架状态">
      <template #default="scope">
        <span style="color: green" v-if="scope.row.goodsSellStatus == 0"
          >销售中</span
        >
        <span style="color: red" v-else>已下架</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="100">
      <template #default="scope">
        <a
          style="cursor: pointer; margin-right: 10px"
          @click="handleEdit(scope.row.goodsId)"
          >修改</a
        >
        <a
          style="cursor: pointer; margin-right: 10px"
          @click="handleStatus(1, scope.row.goodsId)"
          v-if="scope.row.goodsSellStatus == 0"
          >下架</a
        >
        <a
          style="cursor: pointer; margin-right: 10px"
          @click="handleStatus(0, scope.row.goodsId)"
          v-else
          >上架</a
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    class="elpage"
    background
    layout="prev, pager, next"
    v-model:total="store.totalPage"
    v-model:page-size="store.pageSize"
    v-model:current-page="store.currPage"
    @current-change="store.changePage"
  />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useProductStore } from "@/stores/product/product";
import { onMounted, ref } from "vue";
import { ElMessage, type ElTable } from "element-plus";
import { changeStatus } from "@/untils/api/productApi";

const store = useProductStore();
const router = useRouter();

let loading = ref(false);

const getGood = () => {
  loading.value = true;
  store.getterGood().then(() => {
    loading.value = false;
  });
};

const addProduct = () => {
  router.push({
    path: "/product/product_add",
  });
};

const handleEdit = (id: number) => {
  router.push({ path: "/product/product_add", query: { id } });
};

const handleStatus = (status: number, id?: number) => {
  changeStatus({
    data: {
      ids: id ? [id] : [],
    },
    status,
  }).then(() => {
    ElMessage.success("修改成功");
    getGood();
  });
};

onMounted(() => {
  store.getterGood();
});
</script>

<style lang="scss" scoped>
.el-btn {
  margin-bottom: 20px;
  margin-left: 13px;
}
.elpage {
  margin-top: 20px;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
