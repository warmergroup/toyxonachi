import axios from "axios";

export const API_URL = "https://toyxonachi.uz";
const $axios = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

export default $axios;