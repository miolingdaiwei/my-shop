/* eslint-disable @typescript-eslint/ban-types */
<template>
  <el-dialog
    :title="type == 'add' ? '添加轮播图' : '修改轮播图'"
    v-model="store.visible"
    width="400px"
    @close="handleClose"
  >
    <el-form
      :model="store.ruleForm"
      :rules="store.rules"
      ref="formRef"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="图片" prop="url">
        <el-upload
          class="avatar-uploader"
          :action="uploadImgServer"
          accept="jpg,jpeg,png"
          :headers="{
            token: store.token,
          }"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          :on-success="handleUrlSuccess"
        >
          <img
            style="width: 200px; height: 100px; border: 1px solid #e9e9e9"
            v-if="store.ruleForm.url"
            :src="store.ruleForm.url"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="跳转链接" prop="link">
        <el-input type="text" v-model="store.ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="number" v-model="store.ruleForm.sort"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changeVisible">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { uploadImgServer, hasEmoji } from "@/untils/common";
import { ElMessage } from "element-plus";
import { useDialogSwiperStore } from "../stores/homePage/dialogSwiper";

interface myProp {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reload(): any;
}
const props = defineProps<myProp>();
const store = useDialogSwiperStore();
const { changeVisible, handleUrlSuccess } = store;
const formRef = ref();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleBeforeUpload = (file: any) => {
  const sufix = file.name.split(".")[1] || "";
  if (!["jpg", "jpeg", "png"].includes(sufix)) {
    ElMessage.error("请上传 jpg、jpeg、png 格式的图片");
    return false;
  }
};

const handleClose = () => {
  formRef.value.resetFields();
};
const submitForm = () => {
  console.log(formRef.value.validate);
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (hasEmoji(store.ruleForm.link)) {
        ElMessage.error("不要输入表情包，再输入就打死你个龟孙儿~");
        return;
      }
      if (props.type == "add") {
        store.changeSwi().then(() => {
          ElMessage.success("添加成功");
          changeVisible();
          if (props.reload) props.reload();
        });
      } else {
        store.addSwi().then(() => {
          ElMessage.success("修改成功");
          changeVisible();
          if (props.reload) props.reload();
        });
      }
    }
  });
};
watch(
  () => store.id,
  () => {
    store.setSwiper();
  }
);
</script>

<style scoped>
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
