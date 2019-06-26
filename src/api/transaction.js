import axios from "axios";
import config from "@/config";

const api = config.api.transactions;
// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdGVsbGkiLCJyb2xlIjoiVVNFUiIsImV4cGlyZSI6MTU2MTUxNTY4NX0.5o15pkpzL_qwMMXCvr-_SJUwl32U6M7tUvQNGInAKe9AM1YNqQqWI8gSf8trtji_mht_uVAsNfT97wJzsdgVjw";
// const apiClient = axios.create({
//   baseURL: `http://localhost:9095`,
//   headers: {
//     "Access-Control-Allow-Origin": "http://localhost:9095",
//     "Access-Control-Allow-Methods":
//       "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",

//     "Access-Control-Allow-Credentials": "true",
//     "Access-Control-Allow-Headers": "Content-Type",
//     Authorization: `Bearer ${token}`
//   }
// });

const apiClient = axios;

// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

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
