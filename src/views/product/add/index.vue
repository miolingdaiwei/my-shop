<template>
  <div class="login-body">
    <div class="login-container">
      <el-form
        label-position="top"
        ref="loginForm"
        class="login-form"
        :model="ruleFrom"
        :rules="rules"
      >
        <el-form-item label="商品名" prop="shopName">
          <el-input
            type="text"
            style="width: 400px"
            v-model.trim="ruleFrom.shopName"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="shopDescribe">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model.trim="ruleFrom.shopDescribe"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="shopPrice">
          <el-input-number
            v-model="ruleFrom.shopPrice"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="库存" prop="shopCount">
          <el-input-number
            v-model="ruleFrom.shopCount"
            style="width: 400px"
            :min="1"
            :max="100"
          />
        </el-form-item>

        <el-form-item label="商品状态" prop="shopStatus">
          <el-radio v-model="radio" label="1" size="large">上架中</el-radio>
          <el-radio v-model="radio" label="2" size="large">下架中</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm"
            :loading="loading"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormItemRule } from "element-plus";
import { ElForm } from "element-plus";

// inxtanceTyoe  获取类型接口  联合类型
const loginForm = ref<InstanceType<typeof ElForm> | null>(null);
// 自动获取

let radio = ref("1");

const loading = ref(false);

const rules = ref<Record<string, FormItemRule[]>>({
  shopName: [{ required: true, message: "商品名不能为空", trigger: "blur" }],
  shopPrice: [{ required: true, message: "价格不能为空", trigger: "blur" }],
  shopCount: [{ required: true, message: "商品库存不能为空", trigger: "blur" }],
  shopDescribe: [
    { required: true, message: "商品描述不能为空", trigger: "blur" },
  ],
});

type rulefrom = {
  shopName: string;
  shopPrice: number;
  shopCount: number;
  shopDescribe: string;
};

let ruleFrom = reactive<rulefrom>({
  shopName: "",
  shopPrice: 1,
  shopCount: 1,
  shopDescribe: "",
});

const submitForm = () => {
  console.log(22);
  // 在这里向后台发送增加商品的信息
  loading.value = false;
};
</script>

<style scoped>
.add {
  display: flex;
}
.add-container {
  flex: 1;
  height: 100%;
}
.avatar-uploader {
  width: 100px;
  height: 100px;
  color: #ddd;
  font-size: 30px;
}
.avatar-uploader-icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid #e9e9e9;
  padding: 32px 17px;
}
</style>
