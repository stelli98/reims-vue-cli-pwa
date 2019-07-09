import axios from "axios";
import config from "@/config";

const api = config.api.users;

// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getUser (id) {
    const path = api.user;
    return axios.get(`${path}/${id}`);
  },
  getUsers (options) {
    const path = api.user;
    return axios.get(path, { params: options });
  },
  createUser (data) {
    const path = api.user;
    return axios.post(path, data);
  },
  updateUser (id, data) {
    const path = api.user;
    return axios.put(`${path}/${id}`, data);
  },
  deleteUser (id) {
    const path = api.user;
    console.log("deleted user id : ", id);
    return axios.delete(`${path}/${id}`);
  }
};
