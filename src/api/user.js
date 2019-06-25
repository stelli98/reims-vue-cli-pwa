import axios from "axios";
import config from "@/config";

const api = config.api.users;
const token =
  " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGVsbGkiLCJyb2xlIjoiVVNFUiIsImV4cGlyZSI6MTU2MTQ3NDIxN30.ehz5hUy7h_886mo2CGue9dcPXQeETa3eAgXYhXXXzbJSOJoNnNceuaK6o-Jgmw2-OzMXd1lqmR7R_qRplXKe5w";

const apiClient = axios.create({
  baseURL: config.baseURL,
  headers: {
    Authorization: `Bearer ${token}`
  }
});
process.env.NODE_ENV === "development" ? require("@mock-api") : "";

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
    console.log("deleted user id : ", id);
    return apiClient.delete(`${path}/${id}`);
  }
};
