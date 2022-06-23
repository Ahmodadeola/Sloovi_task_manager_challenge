import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://stage.api.sloovi.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const setRequestToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
