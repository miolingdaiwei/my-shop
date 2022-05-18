<template>
  <div class="common-layout">
    <el-container>
      <el-aside> <menu-view /> </el-aside>
      <el-container>
        <el-header><HeaderViewVue /></el-header>
        <el-main>
          <router-view></router-view>
          <!-- 子路由的出口 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MenuView from "@/components/MenuView.vue";
import HeaderViewVue from "@/components/HeaderView.vue";
</script>

<style lang="scss" scoped>
html,
body {
  font-size: 20px;
}
.el-container {
  height: 100vh;
  flex-wrap: nowrap;
}
.el-aside {
  background-color: #304156;
  width: auto;
}
.el-header {
  background-color: #e6e0e0;
}
</style>
