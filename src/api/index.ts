import axios, { type AxiosRequestConfig } from "axios";
import type { CommonRes } from "@/types/common";
import { localGet } from "@/untils/common";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL + "",
});
request.defaults.withCredentials = true;
request.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
request.defaults.headers.common["token"] = localGet("token") || "";
request.defaults.headers.post["Content-Type"] = "application/json";

request.interceptors.request.use((req) => {
  console.log(import.meta.env.VITE_APP_BASE_URL);
  return req;
});

request.interceptors.response.use((res) => {
  return res.data as CommonRes;
});

// 这里的泛型是返回值的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config);
  // config就是url，method等的那个对象
  return res.data as T;
};
