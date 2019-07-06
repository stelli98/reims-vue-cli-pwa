import axios from "axios";
import config from "@/config";

const api = config.api.transactions;

const apiClient = axios.create({
  headers: {
    Authorization: document.cookie
  }
});
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
    console.log(data);
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
