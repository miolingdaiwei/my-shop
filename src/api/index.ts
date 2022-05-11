import axios, { type AxiosRequestConfig } from "axios";
import type { CommonRes } from "@/types/common";

const request = axios.create({
  baseURL: "/api",
});
// request.defaults.withCredentials = true;
// request.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
request.defaults.headers.common["token"] = localStorage.getItem("token") || "";
// request.defaults.headers.post["Content-Type"] = "application/json";

// request.interceptors.response.use((res) => {
//   if (res.data.code !== 200) {
//     ElMessage("发生了错误");
//     return ;
//   }
//   return res;
// });

request.interceptors.response.use((res) => {
  console.log(res);
  return res.data as CommonRes;
});

// 这里的泛型是返回值的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config);
  // config就是url，method等的那个对象
  return res.data as T;
};
