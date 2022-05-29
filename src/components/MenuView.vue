<template>
  <div>
    <el-menu
      :collapse="useStroe.getOpen"
      :unique-opened="true"
      active-text-color="#ffd04b"
      background-color="#304156"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router
    >
      <!-- 主页 -->
      <el-menu-item index="/home">
        <el-icon><avatar /></el-icon>
        <span>主页</span>
      </el-menu-item>

      <!-- 档为submenu才是展开 -->
      <el-sub-menu index="/product">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>商品</span>
        </template>
        <el-menu-item index="/product/product_list">
          <el-icon><icon-menu /></el-icon>
          <span>商品列表</span></el-menu-item
        >
        <el-menu-item index="/product/product_add">
          <el-icon><icon-menu /></el-icon>
          <span>添加产品</span>
        </el-menu-item>
        <el-menu-item index="/product/level1">
          <el-icon><icon-menu /></el-icon> <span>商品分类</span></el-menu-item
        >
      </el-sub-menu>
      <!-- 媒体 -->
      <el-menu-item index="/media">
        <el-icon><location /></el-icon>
        <span>媒体</span>
      </el-menu-item>

      <!-- 订单 -->
      <el-sub-menu index="/order">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>订单</span>
        </template>
        <el-menu-item index="/order/order_list">list</el-menu-item>
        <el-menu-item index="/order/order_offline">offline</el-menu-item>
      </el-sub-menu>

      <!-- 首页配置 -->
      <el-sub-menu index="/homePage">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>首页配置</span>
        </template>
        <el-menu-item index="/homePage/swiper">轮播图</el-menu-item>
        <el-menu-item index="/homePage/newGoods">newGoods</el-menu-item>
        <el-menu-item index="/homePage/hotList">hotList</el-menu-item>
        <el-menu-item index="/homePage/recommend">recommend</el-menu-item>
      </el-sub-menu>

      <!-- 权限 -->
      <el-sub-menu index="/permission">
        <template #title>
          <el-icon><icon-menu /></el-icon>
          <span>权限</span>
        </template>
        <el-menu-item index="/permission/permission_admin">admin</el-menu-item>
        <el-menu-item index="/permission/permission_role">role</el-menu-item>
        <el-menu-item index="/permission/permission_rule">ruley</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Avatar,
  Menu as IconMenu,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Location,
} from "@element-plus/icons-vue";
import { useOpenStore } from "@/stores/common/open";
const useStroe = useOpenStore();
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
