import axios from "axios";
import config from "@/config";
import auth from "@/store/modules/auth";

const api = config.api.auth;

const apiClient = axios.create({
  headers: {
    Authorization: document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    // auth.state.token
  }
});

export default {
  login (data) {
    const path = api.login;
    return axios.post(path, data);
  },
  logout () {
    const path = api.logout;
    return apiClient.get(path);
  }
};
