import axiosInstance from "../core/apis/axios";
import endpoints from "../core/apis/endpoints";

export const loginUser = async () => {
  const payload = {
    email: "smithwills1989@gmail.com",
    password: "12345678",
  };
  const res = await axiosInstance.post(`/${endpoints.login}`, payload);
  return res?.data || res;
};
