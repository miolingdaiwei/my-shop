<template>
  <el-card>
    <div id="earthDemo" class="earth"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import "echarts-gl";
import { onMounted, onUnmounted } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let earth: any = null;
onMounted(() => {
  earth = echarts.init(document.getElementById("earthDemo") as HTMLElement);

  const ROOT_PATH = "/echart";

  const option = {
    backgroundColor: "#000",
    globe: {
      baseTexture: ROOT_PATH + "/data-gl/asset/earth.jpg",
      shading: "lambert",
      environment: ROOT_PATH + "/data-gl/asset/starfield.jpg",
      atmosphere: {
        show: true,
      },
      light: {
        ambient: {
          intensity: 0.1,
        },
        main: {
          intensity: 1.5,
        },
      },
    },
    series: [],
  };

  earth.setOption(option);
});

onUnmounted(() => {
  earth.dispose();
});
</script>

<style lang="scss" scoped>
#earthDemo {
  min-height: 500px;
}
</style>
