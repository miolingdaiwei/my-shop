import realRequest from "@/api/index";
export const adminLogin = (params: object) => {
  return realRequest({
    method: "POST",
    url: "/adminUser/login",
    data: params,
  });
};
