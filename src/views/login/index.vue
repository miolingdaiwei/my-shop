<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <el-image
          style="width: 100px; height: 100px"
          src="https://cbu01.alicdn.com/img/ibank/2020/726/496/17008694627_2070773686.search.jpg"
          fit="fill"
        />
        <div class="name">
          <div class="title">辉仔杂货铺</div>
          <div class="tips">Vue3.0 前台杂货铺哦</div>
        </div>
      </div>
      <el-form
        label-position="top"
        ref="loginForm"
        class="login-form"
        :model="ruleFrom"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            type="text"
            autocomplete="off"
            v-model.trim="ruleFrom.username"
            :placeholder="store.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            autocomplete="off"
            v-model.trim="ruleFrom.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">
            登录表示您已同意
            <a>《服务条款》</a>
          </div>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm"
            :loading="loading"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsernameStore } from "@/stores/common/common";
import { ref, reactive } from "vue";
import type { FormItemRule } from "element-plus";
import { ElForm } from "element-plus";
import { adminLogin } from "@/untils/api/commonApi";
import { Md5 } from "ts-md5";
import { localSet } from "@/untils/common";

const store = useUsernameStore();

// inxtanceTyoe  获取类型接口  联合类型
const loginForm = ref<InstanceType<typeof ElForm> | null>(null);
// 自动获取

const loading = ref(false);

const rules = ref<Record<string, FormItemRule[]>>({
  username: [{ required: true, message: "账户不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  checkCode: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
});

type rulefrom = {
  username: string;
  password: string;
  checkCode: string;
};

let ruleFrom = reactive<rulefrom>({
  username: "admin",
  password: "123456",
  checkCode: "",
});

const submitForm = () => {
  loginForm.value?.validate((vaild) => {
    if (vaild) {
      loading.value = true;
      adminLogin({
        userName: ruleFrom.username,
        passwordMd5: Md5.hashStr(ruleFrom.password),
        // 这是ts-md5的文档写法
      }).then((res) => {
        localSet("token", res);
        store.setUsername(ruleFrom.username);
        loading.value = false;
        window.location.href = "/";
        // 为了刷新页面，也就是刷新一下token
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.el-image {
  margin-right: 2vw;
}
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #ccffff;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 450px;
  background-color: #ffcccc;
  border-radius: 4px;
  box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 20px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: #1baeae;
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.el-link {
  margin-left: 7vw;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
