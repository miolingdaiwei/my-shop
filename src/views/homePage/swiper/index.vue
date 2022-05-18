<template>
  <el-card class="swiper-container">
    <template #header>
      <div class="header">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="handleAdd"
          >增加</el-button
        >
        <el-popconfirm title="确定删除吗？" @confirm="handleDelete">
          <template #reference>
            <el-button type="danger" size="small" icon="el-icon-delete"
              >批量删除</el-button
            >
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="data.list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="轮播图" width="200">
        <template #default="scope">
          <img
            style="width: 150px; height: 150px"
            :src="scope.row.carouselUrl"
            alt="轮播图"
          />
        </template>
      </el-table-column>
      <el-table-column label="跳转链接">
        <template #default="scope">
          <a target="_blank" :href="scope.row.redirectUrl">{{
            scope.row.redirectUrl
          }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="carouselRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.carouselId)"
            >修改</a
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.carouselId)"
          >
            <template #reference>
              <a style="cursor: pointer">删除</a>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="data.totalCount"
      :page-size="data.pageSize"
      :current-page="data.currPage"
      @current-change="changePage"
    />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSwiperStore } from "@/stores/homePage/swiper";
import { storeToRefs } from "pinia";
import { delSwipers } from "@/untils/api/swiperApi";
import { ElMessage } from "element-plus";
import type { SwiperList } from "@/types/swiper";

const swiperStore = useSwiperStore();
const multipleTable = ref();
const loading = ref(false);
const multipleSelection = ref<SwiperList[]>([]);
const { data } = storeToRefs(swiperStore);
// 添加轮播项
const handleAdd = () => {
  swiperStore.setType("add");
};
// 修改轮播图
const handleEdit = (id: number) => {
  swiperStore.setType("edit");
  swiperStore.setId(id);
};
// 选择项
const handleSelectionChange = (val: SwiperList[]) => {
  console.log(val, "val");

  multipleSelection.value = val;
};
// 批量删除
const handleDelete = () => {
  if (!multipleSelection.value.length) {
    ElMessage.error("请选择项");
    return;
  }
  delSwipers(multipleSelection.value.map((i: SwiperList) => i.carouselId)).then(
    () => {
      ElMessage("删除成功");
    }
  );
};
// 单个删除
const handleDeleteOne = (id: number) => {
  loading.value = true;
  delSwipers([id]).then(() => {
    ElMessage("删除成功");
    loading.value = false;
  });
};
const changePage = (val: number) => {
  swiperStore.setPage(val);
  loading.value = true;
  swiperStore.carousels().then(() => {
    loading.value = false;
  });
};

onMounted(() => {
  loading.value = true;
  swiperStore.carousels().then(() => {
    loading.value = false;
  });
});
</script>

<style scoped>
.swiper-container {
  min-height: 100%;
}
.el-card.is-always-shadow {
  min-height: 100% !important;
}
</style>
