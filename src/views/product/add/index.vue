<template>
  <div class="login-body">
    <div class="login-container">
      <el-button type="primary" class="el-btn" @click="toProduct" v-show="id"
        >返回商品列表</el-button
      >
      <el-form
        label-position="top"
        ref="ruleForm"
        :rules="rules"
        :model="goods"
      >
        <el-form-item label="商品分类">
          <el-cascader
            style="width: 300px"
            :placeholder="store.getCode"
            :props="category"
            @change="store.handleChangeCate"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名" prop="goodsName">
          <el-input
            type="text"
            style="width: 400px"
            maxlength="10"
            v-model="goods.goodsName"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="goods.goodsIntro"
            maxlength="30"
            placeholder="请输入商品简介"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="originalPrice">
          <el-input-number
            v-model="goods.originalPrice"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="库存" prop="stockNum">
          <el-input-number
            v-model="goods.stockNum"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="商品售价" prop="sellingPrice">
          <el-input-number
            v-model="goods.sellingPrice"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>

        <el-form-item label="商品标签" prop="tag">
          <el-input
            v-model="goods.tag"
            style="width: 300px"
            placeholder="请输入商品小标签"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="商品状态" prop="goodsSellStatus">
          <el-radio-group v-model="goods.goodsSellStatus">
            <el-radio :label="0">上架</el-radio>
            <el-radio :label="1">下架</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item required label="商品主图" prop="goodsCoverImg">
          <el-upload
            class="avatar-uploader"
            accept="jpg,jpeg,png"
            :show-file-list="false"
            :action="uploadImgServer"
            :headers="{
              token: token,
            }"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img
              style="width: 100px; height: 100px; border: 1px solid #e9e9e9"
              class="avatar"
              v-if="goods.goodsCoverImg"
              :src="goods.goodsCoverImg"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="详情内容" required>
          <div ref="editor"></div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitAdd">{{
            route.query?.id ? "立即修改" : "立即创建"
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import WangEditor from "wangeditor";
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { FormItemRule } from "element-plus";
import { ElForm } from "element-plus";
import { addChangeGood, getCategory } from "@/untils/api/addGoodApi";
import { useRoute, useRouter } from "vue-router";
import {
  uploadImgsServer,
  uploadImgServer,
  localGet,
  hasEmoji,
} from "@/untils/common";
import { useProductStore } from "@/stores/product/addGood";
import type Editor from "wangeditor";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { Method } from "axios";
import { storeToRefs } from "pinia";
import type { AddGood } from "@/types/good/good";
import type { CommonRes, FileCommonRes } from "@/types/common";

const store = useProductStore();
const route = useRoute();
const router = useRouter();

const { goods } = storeToRefs(store);
const ruleForm = ref<InstanceType<typeof ElForm> | null>(null);
const id = route.query?.id;
const loading = ref(false);
const token = ref(localGet("token"));

const handleBeforeUpload = (file: FileCommonRes) => {
  const sufix = file.name.split(".")[1] || "";
  if (!["jpg", "jpeg", "JPG", "JPEG"].includes(sufix)) {
    ElMessage.error("请上传 jpg、jpeg、JPEG 格式的图片");
    return false;
  }
};
const handleUrlSuccess = (val: CommonRes) => {
  goods.value.goodsCoverImg = val.data || "";
};
let editor = ref("");
let category = {
  //这是一个三级分类   这段代码不太懂
  lazy: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lazyLoad(node: any, resolve: any) {
    const { level = 0 } = node;
    getCategory(node).then((res) => {
      const list = res.list;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nodes = list.map((item: any) => ({
        value: item.categoryId,
        label: item.categoryName,
        leaf: level > 1,
      }));
      resolve(nodes);
    });
  },
};

const rules = ref<Record<string, FormItemRule[]>>({
  goodsName: [{ required: true, message: "商品名不能为空", trigger: "blur" }],
  goodsCoverImg: [{ required: true, message: "请上传主图", trigger: "blur" }],
});

const submitAdd = () => {
  loading.value = false;
  ruleForm.value?.validate((vaild: boolean) => {
    if (vaild) {
      let httpOption: Method = "POST";
      if (
        hasEmoji(goods.value.goodsIntro) ||
        hasEmoji(goods.value.goodsName) ||
        hasEmoji(goods.value.tag) ||
        hasEmoji(goods.value.goodsDetailContent)
      ) {
        ElMessage.error("不要输入表情包，再输入就打死你个龟孙儿~");
        return;
      }

      let params: AddGood = {
        goodsCategoryId: goods.value.goodsCategoryId,
        goodsCoverImg: goods.value.goodsCoverImg,
        goodsDetailContent: instance.txt.html() as string,
        goodsIntro: goods.value.goodsIntro,
        goodsName: goods.value.goodsName,
        goodsSellStatus: goods.value.goodsSellStatus,
        originalPrice: goods.value.originalPrice,
        sellingPrice: goods.value.sellingPrice,
        stockNum: goods.value.stockNum,
        tag: goods.value.tag,
      };
      if (id) {
        params.goodsId = id as string;
        // 加入goodsid
        // 修改商品使用 put 方法
        httpOption = "PUT";
      }
      addChangeGood(params, httpOption).then((res) => {
        console.log(res);
        ElMessage(id ? "修改完成" : "添加成功");
        loading.value = false;
        router.push({
          path: "/product/product_list",
        });
      });
    }
  });
};

const getOne = (id: string) => {
  store.getterGood(id).then(() => {
    console.log(22);
    console.log("初始化数据");
  });
};

let instance: Editor;
// 类型是new wangditor的构造函数找来的
onMounted(() => {
  // 以下代码不太懂，使用富文本编辑器
  instance = new WangEditor(editor.value);
  instance.config.showLinkImg = false;
  instance.config.showLinkImgAlt = false;
  instance.config.showLinkImgHref = false;
  instance.config.uploadImgMaxSize = 2 * 1024 * 1024; // 2M
  instance.config.uploadFileName = "file";
  instance.config.uploadImgHeaders = {};
  instance.config.uploadImgHooks = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customInsert: function (insertImgFn: any, result) {
      console.log("result", result);
      if (result.data && result.data.length) {
        result.data.forEach((item) => insertImgFn(item));
      }
    },
  };
  instance.config.uploadImgServer = uploadImgsServer;
  Object.assign(instance.config, {
    onchange() {
      console.log("change");
    },
  });
  instance.create();
  if (id) {
    getOne(id as string);
  }
});

onBeforeUnmount(() => {
  instance.destroy();
});

const toProduct = () => {
  router.push({
    path: "/product/product_list",
  });
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
  padding: 32px 32px;
}
.el-btn {
  margin-bottom: 20px;
}
</style>
