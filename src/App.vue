<script setup lang="ts">
import { RouterView } from "vue-router";
import locale from "element-plus/lib/locale/lang/zh-cn";
import { onMounted } from "vue";
import { localGet } from "./untils/common";
import router from "./router";
import { ElMessage } from "element-plus";
import { getGoodList } from "./untils/api/productApi";
onMounted(() => {
  getGoodList({
    pageNumber: 1,
    pageSize: 10,
  });
  // just checked that was code deadline
  if (!localGet("token")) {
    router.replace({
      path: "/login",
    });
    ElMessage("请重新登陆");
  }
  // when first come in
});
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
