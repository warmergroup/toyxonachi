import axios from "axios";

export const API_URL = "https://toyxonachi.uz";
const API_KEY = 'DC897B1602B87D34C378BC4450243218';
const $axios = axios.create({
  withCredentials: false,
  baseURL: `${API_URL}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Api-key': API_KEY
  }
});

export default $axios;