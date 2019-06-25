import axios from "axios";
import config from "@/config";

const api = config.api.transactions;
const token =
  " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGVsbGkiLCJyb2xlIjoiVVNFUiIsImV4cGlyZSI6MTU2MTQ3NDIxN30.ehz5hUy7h_886mo2CGue9dcPXQeETa3eAgXYhXXXzbJSOJoNnNceuaK6o-Jgmw2-OzMXd1lqmR7R_qRplXKe5w";

const apiClient = axios.create({
  baseURL: `http://localhost:9095`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  }
});

process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getTransaction(id) {
    const path = api.transaction;
    return apiClient.get(`${path}/${id}`);
  },
  getTransactions(options) {
    const path = api.transaction;
    return apiClient.get(path, { params: options });
  },
  createTransaction(data) {
    const path = api.transaction;
    return apiClient.post(path, data);
  },
  saveTransaction(data) {
    const path = api.transaction;
    return apiClient.put(path, data);
  },
  deleteTransaction(id) {
    const path = api.transaction;
    console.log("delete id :" + id);
    return apiClient.delete(`${path}/${id}`);
  }
};
