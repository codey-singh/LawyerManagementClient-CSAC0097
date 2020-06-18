import axios from "axios";
import localStorageService from "./LocalStorageService";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1/";

axios.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    console.log("hello");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axios;
