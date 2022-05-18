<template>
  <div class="menuDiv">
    <div class="menuDiv-left">
      <el-button @click="openMenu" type="info">
        <el-icon style="vertical-align: middle" v-if="!store.openMenu">
          <d-arrow-left />
        </el-icon>
        <el-icon style="vertical-align: middle" v-else>
          <d-arrow-right />
        </el-icon>
      </el-button>
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item in routes" :key="item.path">{{
          item.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menuDiv-right">
      <el-space size="default">
        <el-input
          v-model="input"
          class="w-50 m-2"
          placeholder="Type something"
          :prefix-icon="Search"
        />
        <el-dropdown split-button type="info">
          个人
          <template #dropdown>
            <el-dropdown-menu>
              <span class="drop-span">{{ usernameStore.username }}</span>
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item>更改信息</el-dropdown-item>
              <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DArrowLeft, DArrowRight, Search } from "@element-plus/icons-vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useOpenStore } from "@/stores/common/open";
import { useRouter } from "vue-router";
import { computed, ref } from "@vue/reactivity";
import { useUsernameStore } from "@/stores/common/common";

const usernameStore = useUsernameStore();
const input = ref("");
const store = useOpenStore();
const router = useRouter();

const exitLogin = () => {
  usernameStore.exitUsername();
  router.push("/login");
};

// 利用计算属性，将随时变化的route的meta字段的title放入面包屑
const routes = computed(() => {
  return router.currentRoute.value.matched.filter((item) => item.meta.title);
});

const openMenu = () => {
  store.changeOpenMenu();
};
</script>

<style lang="scss" scoped>
.menuDiv {
  height: 100%;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  &-left {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-right {
    width: 50%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
}
.drop-span {
  display: flex;
  justify-content: center;
}
.el-button {
  margin-right: 1.5vw;
}
</style>
