import axios from "axios";
import config from "@/config";

const api = config.api.users;

export default {
  getUser(id) {
    const path = api.user;
    return axios.get(`${path}/${id}`);
  },
  getUsers(options) {
    const path = api.user;
    return axios.get(path, { params: options });
  },
  createUser(data) {
    const path = api.user;
    return axios.post(path, data);
  },
  updateUser(id, data) {
    const path = api.user;
    return axios.put(`${path}/${id}`, data);
  }
};
