<template>
  <el-button v-if="route.query.level" @click="backCate" class="eBtn"
    >返回上一级</el-button
  >
  <el-card class="category-container">
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
      v-loading="state.loading"
      ref="multipleTable"
      :data="state.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="categoryName" label="分类名称"> </el-table-column>
      <el-table-column prop="categoryRank" label="排序值" width="120">
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="200">
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleEdit(scope.row.categoryId)"
            >修改</a
          >
          <a
            style="cursor: pointer; margin-right: 10px"
            @click="handleNext(scope.row)"
            >下级分类</a
          >
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.categoryId)"
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
      :total="state.total"
      :page-size="state.pageSize"
      :current-page="state.currentPage"
      @current-change="changePage"
    />
  </el-card>
  <DialogAddCategory :reload="getMyCategory" :type="state.type" />
</template>

<script lang="ts" setup>
import DialogAddCategory from "@/components/DialogAddCategory.vue";
import type { categoryInt, categoryList, categoryRes } from "@/types/category";
import { useRoute, useRouter } from "vue-router";
import { category, delCategory } from "@/untils/api/categoryApi";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useCategoryStore } from "@/stores/product/category";

const categoryStore = useCategoryStore();
const router = useRouter();
const route = useRoute();
let { level = 1, parent_id = 0 } = route.query;

let myCategory = ref<categoryInt>({
  pageNumber: 1,
  pageSize: 10,
  categoryLevel: level as number,
  parentId: parent_id as number,
});

let state = reactive({
  loading: false,
  tableData: [] as categoryList[], // 数据列表
  multipleSelection: [] as categoryList[], // 选中项
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 10, // 分页大小
  type: "add", // 操作类型
  level: 1,
  parent_id: 0,
});

const handleAdd = () => {
  state.type = "add";
  categoryStore.setOpen();
};

const backCate = () => {
  myCategory.value.categoryLevel = 1;
  myCategory.value.parentId = 0;
  getMyCategory();
  router.back();
};

// 修改分类
const handleEdit = (id: number) => {
  console.log(id);
  state.type = "edit";
  categoryStore.setOpen();
  categoryStore.setId(id);
};

// 选择项
const handleSelectionChange = (val: categoryList[]) => {
  state.multipleSelection = val;
};

// 批量删除
const handleDelete = () => {
  if (!state.multipleSelection.length) {
    ElMessage.error("请选择项");
    return;
  }
  delCategory({ ids: state.multipleSelection.map((i) => i.categoryId) }).then(
    () => {
      ElMessage("删除成功");
      getMyCategory();
    }
  );
};
const handleDeleteOne = (id: number) => {
  console.log(id);
  delCategory({ id: [id] }).then(() => {
    ElMessage("删除成功");
    getMyCategory();
  });
};
const changePage = (val: number) => {
  myCategory.value.pageNumber = val;
  getMyCategory();
};
const handleNext = (item: categoryList) => {
  const levelNumber = item.categoryLevel + 1;
  if (levelNumber == 4) {
    ElMessage.error("没有下一级");
    return;
  }
  router.push({
    name: `level${levelNumber}`,
    query: {
      level: levelNumber,
      parent_id: item.categoryId,
    },
  });
};

const getMyCategory = () => {
  category(myCategory.value).then((res: categoryRes) => {
    state.tableData = res.list;
    state.total = res.totalCount;
    state.currentPage = res.currPage;
    state.loading = false;
    state.level = level as number;
    state.parent_id = parent_id as number;
  });
};

onMounted(() => {
  getMyCategory();
});

onUnmounted(() => {
  unwatch();
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unwatch = router.afterEach((to: any) => {
  if (["category", "level2", "level3"].includes(to.name)) {
    myCategory.value.categoryLevel = route.query.level as unknown as number;
    myCategory.value.parentId = route.query.parent_id as unknown as number;
    getMyCategory();
  }
});
</script>

<style lang="scss" scoped>
.eBtn {
  margin-bottom: 15px;
}
</style>
