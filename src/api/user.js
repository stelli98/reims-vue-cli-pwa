import axios from "axios";
import config from "@/config";

const api = config.api.users;

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGVsbGkiLCJyb2xlIjoiVVNFUiIsImV4cGlyZSI6MTU2MTUxNTY4NX0.5o15pkpzL_qwMMXCvr-_SJUwl32U6M7tUvQNGInAKe9AM1YNqQqWI8gSf8trtji_mht_uVAsNfT97wJzsdgVjw";
const apiClient = axios.create({
  headers: {
    Authorization: document.cookie
  }
});

// const apiClient = axios;

// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getUser(id) {
    const path = api.user;
    return apiClient.get(`${path}/${id}`);
  },
  getUsers(options) {
    const path = api.user;
    return apiClient.get(path, { params: options });
  },
  createUser(data) {
    const path = api.user;
    return apiClient.post(path, data);
  },
  updateUser(id, data) {
    const path = api.user;
    return apiClient.put(`${path}/${id}`, data);
  },
  deleteUser(id) {
    const path = api.user;
    return apiClient.delete(`${path}/${id}`);
  }
};
