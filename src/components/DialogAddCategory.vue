<template>
  <el-dialog
    :title="type == 'add' ? '添加分类' : '修改分类'"
    v-model="visible"
    width="400px"
    @close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="good-form"
    >
      <el-form-item label="分类名称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="rank">
        <el-input type="number" max="200" v-model="ruleForm.rank"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.setOpen()">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { addCategory, myGetDetail } from "@/untils/api/categoryApi";
import { hasEmoji } from "@/untils/common";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/product/category";
import { storeToRefs } from "pinia";

interface Prop {
  type: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  reload: Function;
}

const store = useCategoryStore();

const formRef = ref();

const route = useRoute();
const rules = {
  name: [{ required: "true", message: "名称不能为空", trigger: ["change"] }],
  rank: [{ required: "true", message: "排序值不能为空", trigger: ["change"] }],
};
const { visible, id, ruleForm } = storeToRefs(store);
const props = defineProps<Prop>();

watch(
  () => store.visible,
  (newVal: boolean, oldVal) => {
    console.log(oldVal);
    if (newVal === true) {
      if (ref(id).value > 0) {
        getDetial(store.id);
      } else {
        const { level = 1, parent_id = 0 } = route.query;
        store.setFrom("", "");
        store.setDetail(parent_id as number, level as number);
      }
    }
  }
);

const getDetial = (id: number) => {
  myGetDetail(id).then((res) => {
    store.setFrom(res.categoryName, res.categoryRank);
    store.setDetail(res.parentId, res.categoryLevel);
  });
};
const handleClose = () => {
  formRef.value.resetFields();
  store.outId();
};
const submitForm = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (hasEmoji(store.ruleForm.name)) {
        ElMessage.error("不要输入表情包，再输入就打死你个龟孙儿~");
        return;
      }
      if (store.ruleForm.name.length > 16) {
        ElMessage.error("名称不能超过16个字符");
        return;
      }
      if ((store.ruleForm.rank as unknown as number) > 200) {
        ElMessage.error("排序不能超过200");
        return;
      }
      if (props.type == "add") {
        addCategory(store.postData, "POST").then(() => {
          ElMessage.success("添加成功");
          store.visible = false;
          if (props.reload) props.reload();
        });
      } else {
        addCategory(store.putData, "PUT").then(() => {
          ElMessage.success("修改成功");
          store.visible = false;
          if (props.reload) props.reload();
        });
      }
    }
  });
};
</script>
