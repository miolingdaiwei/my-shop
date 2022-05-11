/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <el-button type="primary" class="el-btn" @click="addProduct"
    >添加商品</el-button
  >
  <el-table
    v-loading="loading"
    ref="multipleTableRef"
    :data="state.list"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
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
    v-model:total="state.totalPage"
    v-model:page-size="state.pageSize"
    v-model:current-page="state.currPage"
    @current-change="changePage"
  />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type ElTable } from "element-plus";
import { changeStatus, getGoodList } from "@/untils/api";
import type { Glist, GoodList } from "@/types/good/good";

let loading = ref(false);
const router = useRouter();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Glist[]>([]);

// 这是我这个页面的一个仓库
let state = reactive<GoodList>({
  list: [] as Glist[], // 数据列表
  totalCount: 0, // 总条数
  currPage: 1, // 当前页
  pageSize: 10, // 分页大小
  totalPage: 1,
});

// 这个页面的拉取
const getGood = () => {
  loading.value = true;
  getGoodList({
    pageNumber: state.currPage,
    pageSize: state.pageSize,
  }).then((res) => {
    console.log(res);
    state.currPage = res.currPage;
    state.list = res.list;
    state.pageSize = res.pageSize;
    state.totalCount = res.totalCount;
    state.totalPage = res.totalPage;
    loading.value = false;
  });
};

const addProduct = () => {
  router.push({
    path: "/product/product_add",
  });
};

const handleEdit = (id: number) => {
  router.push({ path: "/product/product_add", params: { goodsId: id } });
};
// 选择项
const handleSelectionChange = (val: Glist[]) => {
  multipleSelection.value = val;
};

// 跳页
const changePage = (val: number) => {
  state.currPage = val;
  getGood();
};

const handleStatus = (status: number, id?: number) => {
  changeStatus({
    data: {
      ids: id ? [id] : [],
    },
    status,
  }).then((res) => {
    console.log(res);
    ElMessage.success("修改成功");
  });
  getGood();
};

onMounted(() => {
  getGood();
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
