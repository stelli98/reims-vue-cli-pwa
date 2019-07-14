import axios from "axios";
import config from "@/config";
import auth from "@/store/modules/auth"

const api = config.api.users;

const apiClient = axios.create({
  headers: {
    Authorization: auth.state.token
  }
});

// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getUser (id) {
    const path = api.user;
    return apiClient.get(`${path}/${id}`);
  },
  getUsers (options) {
    const path = api.user;
    return apiClient.get(path, { params: options });
  },
  createUser (data) {
    const path = api.user;
    return apiClient.post(path, data);
  },
  updateUser (id, data) {
    const path = api.user;
    return apiClient.put(`${path}/${id}`, data);
  },
  deleteUser (id) {
    const path = api.user;
    return apiClient.delete(`${path}/${id}`);
  }
};
