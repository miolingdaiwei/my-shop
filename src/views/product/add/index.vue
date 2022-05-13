<template>
  <div class="login-body">
    <div class="login-container">
      <el-form label-position="top" ref="ruleForm" :rules="rules" :model="good">
        <el-form-item required label="商品分类">
          <el-cascader
            style="width: 300px"
            :placeholder="defaultCate"
            :props="category"
            @change="handleChangeCate"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品名" prop="goodsName">
          <el-input
            type="text"
            style="width: 400px"
            maxlength="10"
            v-model="good.goodsName"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品简介" prop="goodsIntro">
          <el-input
            type="textarea"
            style="width: 400px"
            v-model="good.goodsIntro"
            maxlength="30"
            placeholder="请输入商品简介"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="originalPrice">
          <el-input-number
            v-model="good.originalPrice"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="库存" prop="stockNum">
          <el-input-number
            v-model="good.stockNum"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>
        <el-form-item label="商品售价" prop="sellingPrice">
          <el-input-number
            v-model="good.sellingPrice"
            style="width: 400px"
            :min="1"
            :max="1000"
          />
        </el-form-item>

        <el-form-item label="商品标签" prop="tag">
          <el-input
            v-model="good.tag"
            style="width: 300px"
            placeholder="请输入商品小标签"
            maxlength="10"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="商品状态" prop="goodsSellStatus">
          <el-radio-group v-model="good.goodsSellStatus">
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
              v-if="good.goodsCoverImg"
              :src="good.goodsCoverImg"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item label="详情内容">
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
import { addChangeGood, getCategory, getOneGood } from "@/untils/api";
import { useRoute } from "vue-router";
import type { AddGood, Glist } from "@/types/good/good";
import {
  uploadImgsServer,
  uploadImgServer,
  localGet,
  hasEmoji,
} from "@/untils/common";
import type Editor from "wangeditor";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { Method } from "axios";

const ruleForm = ref<InstanceType<typeof ElForm> | null>(null);
const route = useRoute();
let defaultCate = ref("");
const loading = ref(false);
const token = ref(localGet("token"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleBeforeUpload = (file: any) => {
  const sufix = file.name.split(".")[1] || "";
  if (!["jpg", "jpeg", "png"].includes(sufix)) {
    ElMessage.error("请上传 jpg、jpeg、png 格式的图片");
    return false;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleUrlSuccess = (val: any) => {
  good.value.goodsCoverImg = val.data || "";
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

let good = ref<Glist>({
  createTime: "",
  createUser: 0,
  goodsCarousel: "",
  goodsCategoryId: 0,
  goodsCoverImg: "",
  goodsDetailContent: "",
  goodsId: 0,
  goodsIntro: "",
  goodsName: "",
  goodsSellStatus: 0,
  originalPrice: 0,
  sellingPrice: 0,
  stockNum: 0,
  tag: "",
  updateTime: "",
  updateUser: 0,
});

const rules = ref<Record<string, FormItemRule[]>>({
  //因为数字设置最大最小值，不需要验证
  goodsName: [{ required: true, message: "商品名不能为空", trigger: "blur" }],
  goodsCoverImg: [{ required: true, message: "请上传主图", trigger: "blur" }],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleChangeCate = (val: any) => {
  console.log(val);
  // good.value.categoryId.value = val[2] || 0; //获取三级分类的最后一个id
  good.value.goodsCategoryId = val[2] || 0;
};

const submitAdd = () => {
  loading.value = false;
  ruleForm.value?.validate((vaild) => {
    console.log(typeof vaild, "这是vaild的类型");
    if (vaild) {
      let httpOption: Method = "POST";
      let params: AddGood = {
        goodsCategoryId: good.value.goodsCategoryId,
        goodsCoverImg: good.value.goodsCoverImg,
        goodsDetailContent: instance.txt.html() as string,
        goodsIntro: good.value.goodsIntro,
        goodsName: good.value.goodsName,
        goodsSellStatus: good.value.goodsSellStatus,
        originalPrice: good.value.originalPrice,
        sellingPrice: good.value.sellingPrice,
        stockNum: good.value.stockNum,
        tag: good.value.tag,
      };
      if (
        hasEmoji(params.goodsIntro) ||
        hasEmoji(params.goodsName) ||
        hasEmoji(params.tag) ||
        hasEmoji(params.goodsDetailContent)
      ) {
        ElMessage.error("不要输入表情包，再输入就打死你个龟孙儿~");
        return;
      }
      if (params.goodsName.length > 128) {
        ElMessage.error("商品名称不能超过128个字符");
        return;
      }
      if (params.goodsIntro.length > 200) {
        ElMessage.error("商品简介不能超过200个字符");
        return;
      }
      if (params.tag.length > 16) {
        ElMessage.error("商品标签不能超过16个字符");
        return;
      }
      console.log("params", params);
      if (route.query?.id) {
        params.goodsId = route.query.id as string;
        // 修改商品使用 put 方法
        httpOption = "PUT";
      }
      addChangeGood(params, httpOption).then((res) => {
        console.log(res);
        ElMessage(route.query?.id ? "修改完成" : "添加成功");
        loading.value = false;
      });
    }
  });
};

// 这页面的拉取
const getOne = (id: number) => {
  getOneGood(id).then((res) => {
    console.log(res);
    good.value = res.goods;
    defaultCate.value = `${res.firstCategory.categoryName}/${res.secondCategory.categoryName}/${res.thirdCategory.categoryName}`;
    // categoryId.value = res.goods.goodsCategoryId;
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
  instance.config.uploadImgHeaders = {
    // token: localStorage.getItem("token") | "",
  };
  // 图片返回格式不同，需要自定义返回格式
  instance.config.uploadImgHooks = {
    // 图片上传并返回了结果，想要自己把图片插入到编辑器中
    // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customInsert: function (insertImgFn: any, result) {
      console.log("result", result);
      // result 即服务端返回的接口
      // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
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

  // 判断是来自productlist
  if (route.query?.id) {
    getOne(route.query?.id as unknown as number);
  }
});
onBeforeUnmount(() => {
  instance.destroy();
});
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
</style>
