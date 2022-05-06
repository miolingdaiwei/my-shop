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
          <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          >
          <el-link href="/cellLogin">手机号登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router/index";
import { ref, reactive, onMounted } from "vue";
import { ElMessage, type FormItemRule } from "element-plus";
import { ElForm } from "element-plus";
import { checkLogin } from "@/api/sendCheckCode";

// inxtanceTyoe  获取类型接口  联合类型
const loginForm = ref<InstanceType<typeof ElForm> | null>(null);
// 自动获取

const loading = ref(false);

let checked = ref<boolean>(false);

const rules = ref<Record<string, FormItemRule[]>>({
  username: [{ required: true, message: "账户不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  checkCode: [{ required: true, message: "验证码不能为控", trigger: "blur" }],
});

type rulefrom = {
  username: string;
  password: number;
  checkCode: string;
};

let ruleFrom = reactive<rulefrom>({
  username: "",
  password: 0,
  checkCode: "",
});

const submitForm = () => {
  loading.value = true;
  checkLogin().then((res) => {
    for (let item of res.data.user) {
      if (
        item.username == ruleFrom.username &&
        item.password == ruleFrom.password
      ) {
        ElMessage("登录成功");
        if (checked.value) {
          localStorage.setItem("autologin", ruleFrom.username);
        }
        router.push({
          path: "/",
          query: {
            username: ruleFrom.username,
          },
        });
        return;
      } else {
        ElMessage("账号或密码错误");
      }
    }
  });
  loading.value = false;
};
onMounted(() => {
  if (localStorage.getItem("autologin")) {
    router.push({
      path: "/",
      query: {
        username: localStorage.getItem("autologin"),
      },
    });
  }
});
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
