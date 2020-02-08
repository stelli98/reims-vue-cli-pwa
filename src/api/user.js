import axios from "axios";
import config from "@/config";
const api = config.api.users;

export default {
  getUserPersonalData(token) {
    const path = api.user;
    return axios.get(path, {
      headers: {
        Authorization: token
      }
    });
  },
  getUserFamily(token) {
    const path = api.family;
    return axios.get(path, {
      headers: {
        Authorization: token
      }
    });
  },
  downloadPersonalReport(options, token) {
    const path = api.report;
    return axios.get(path, {
      params: options,
      headers: {
        Authorization: token
      }
    });
  },
  getViewImage(url, token) {
    const path = api.image;
    return axios.get(`${path}?path=${url}`, {
      headers: {
        Authorization: token
      }
    });
  },
  changePassword(role, data, token) {
    const path = role === "admin" ? config.api.admin.user : api.user;
    return axios.put(path, data, {
      headers: {
        Authorization: token
      }
    });
  }
};
