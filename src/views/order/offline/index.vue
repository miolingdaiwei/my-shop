<template>
  <div class="aside">32</div>
</template>
<script lang="ts" setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  axios.get("/user/menu").then((res) => {
    console.log(res);
  });
});
</script>

<style lang="scss" scoped>
.el-menu-item.is-active {
  background-color: var(--el-menu-hover-bg-color);
}
.collpase-btn {
  text-align: center;
  width: 100%;
  padding: 10px 0px;
  cursor: pointer;
  .el-icon {
    color: white;
    font-size: 24px;
  }
}
</style>
