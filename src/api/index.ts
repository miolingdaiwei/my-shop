import axios, { type AxiosRequestConfig } from "axios";
import type { CommonRes } from "@/types/common";
import { localGet } from "@/untils/common";
import { ElMessage } from "element-plus";
import router from "@/router/index";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL + "",
});
request.defaults.withCredentials = true;
request.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
request.defaults.headers.common["token"] = localGet("token") || "";
request.defaults.headers.post["Content-Type"] = "application/json";

request.interceptors.request.use((req) => {
  return req;
});

request.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    ElMessage("服务端异常");
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) {
      ElMessage.error(res.data.message);
    }
    if (res.data.resultCode === 419) {
      ElMessage("管理员登录过期");
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }
  console.log(22);
  return res.data as CommonRes;
});

// 这里的泛型是返回值的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config);
  // config就是url，method等的那个对象
  return res.data as T;
};
