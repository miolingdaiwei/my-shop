<template>
  <el-button type="primary" class="el-btn" @click="addShop">添加商品</el-button>
  <el-table
    ref="multipleTableRef"
    :data="ass?.shoplist"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Name" width="120">
      <template #default="scope">{{ scope.row.shopname }}</template>
    </el-table-column>

    <el-table-column label="Price" width="120">
      <template #default="scope">{{ scope.row.price }}</template>
    </el-table-column>

    <el-table-column label="Counnt" width="120">
      <template #default="scope">{{ scope.row.count }}</template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import type { ElTable } from "element-plus";
import type { ShopList } from "@/types/shopObj/shopObj";
import { getShopObj2 } from "@/api/sendCheckCode";

interface User {
  date: string;
  name: string;
  address: string;
}

const router = useRouter();
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);
let ass = ref<ShopList>();

onMounted(() => {
  getShopObj2().then((res) => {
    ass.value = res.data;
  });
});

const addShop = () => {
  router.push({
    path: "/product/product_add",
  });
};

const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const handleEdit = (index: number, dara: string) => {
  router.push({
    path: "/product/product_add",
    params: {
      index,
    },
  });
  console.log(22, dara);
};
</script>

<style lang="scss" scoped>
.el-btn {
  margin-bottom: 20px;
  margin-left: 13px;
}
</style>
