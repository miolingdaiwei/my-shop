import axios, { type AxiosRequestConfig } from "axios";
const request = axios.create({
  baseURL: "/api",
});

// 这里的泛型是返回值的类型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async <T = any>(config: AxiosRequestConfig) => {
  const res = await request(config);
  // config就是url，method等的那个对象
  console.log("正在发送get请求");

  return res.data as T;
  // res.data是axios包装下的data  就是真实的返回数据  {data:'''  code:'''}
};
