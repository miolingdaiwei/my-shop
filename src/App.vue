<script setup lang="ts">
import { RouterView } from "vue-router";
import locale from "element-plus/lib/locale/lang/zh-cn";
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
