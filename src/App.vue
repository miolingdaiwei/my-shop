<script setup lang="ts">
import { RouterView } from "vue-router";
import locale from "element-plus/lib/locale/lang/zh-cn";
import { useRouter } from "vue-router";

const router = useRouter();
router.replace({
  path: "/login",
});
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
