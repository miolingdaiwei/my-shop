<template>
  <div>
    <div v-for="(item, index) in a?.shoplist" :key="index">
      <span>{{ item?.shopname }},{{ item.count }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getShopObj2 } from "@/api/sendCheckCode";
import { onMounted, ref } from "vue";
import type { ShopList } from "@/types/shopObj/shopObj";
let a = ref<ShopList>();

onMounted(() => {
  getShopObj2().then((res) => {
    a.value = res.data;
  });
});
</script>

<style lang="scss" scoped>
html,
body {
  font-size: 20px;
}
.el-container {
  height: 100vh;
  background-color: #909399;
}
.el-aside {
  background-color: #304156;
}
</style>
