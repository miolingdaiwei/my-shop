<template>
  <el-table
    ref="multipleTableRef"
    :data="ass?.orderlist"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Name" width="120">
      <template #default="scope">{{ scope.row.ordernumber }}</template>
    </el-table-column>

    <el-table-column label="Price" width="120">
      <template #default="scope">{{ scope.row.allmoney }}</template>
    </el-table-column>

    <el-table-column label="Counnt" width="120">
      <template #default="scope">{{ scope.row.delivered }}</template>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-drawer
    v-model="drawer"
    :direction="direction"
    :before-close="handleClose"
  >
    <ul>
      <li v-for="(item, index) in mydata" :key="index">
        {{ item }}
      </li>
    </ul>
  </el-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { ElTable } from "element-plus";
import type { OrderList, OrderObj } from "@/types/shopObj/shopObj";
import { getorder } from "@/api/sendCheckCode";
import { ElMessageBox } from "element-plus";

let mydata = ref<OrderObj>({
  ordernumber: 0,
  ordername: "S",
  allmoney: 0,
  delivered: false,
  shop: [
    {
      shopname: "string",
      shopprice: 2,
      count: 1,
    },
  ],
});

let direction = ref("rtl");

let drawer = ref(false);

const multipleTableRef = ref<InstanceType<typeof ElTable>>();

let ass = ref<OrderList>();

const handleEdit = (index: number, data: OrderObj) => {
  mydata.value = data;
  console.log(mydata);
  drawer.value = true;
};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done();
      drawer.value = false;
    })
    .catch(() => {
      // catch error
    });
};

const handleSelectionChange = () => {
  console.log("改变了");
};

onMounted(() => {
  getorder().then((res) => {
    console.log(res);
    ass.value = res.data;
  });
});
</script>
