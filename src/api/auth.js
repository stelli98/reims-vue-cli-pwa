import axios from "axios";
import config from "@/config";

const api = config.api.auth;

const apiClient = axios.create({
  // baseURL: "http://localhost:9095",
  headers: {
    Authorization: document.cookie
  }
});

export default {
  login(data) {
    const path = api.login;
    return axios.post(path, data);
  },
  logout() {
    const path = api.logout;
    return apiClient.get(path);
  }
};
