import axios from "axios";
import config from "@/config";

const api = config.api.auth;

const apiClient = axios;

// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  login(data) {
    const path = api.user.login;
    return apiClient.post(path, data);
  }
};
