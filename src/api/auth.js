import axios from "axios";
import config from "@/config";

const api = config.api.auth;

export default {
  login (data) {
    const path = api.login;
    return axios.post(path, data);
  },
  logout (token) {
    const path = api.logout;
    return axios.get(path, {
      headers: {
        authorization: token
      }
    });
  }
};
