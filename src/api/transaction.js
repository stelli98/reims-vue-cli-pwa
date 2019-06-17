import axios from "axios";
import config from "@/config";

const api = config.api.transactions;

process.env.NODE_ENV === 'development' ? require("@mock-api") : '';

export default {
  getTransaction (id) {
    const path = api.transaction;
    return axios.get(`${path}/${id}`);
  },
  getTransactions (options) {
    const path = api.transaction;
    return axios.get(path, { params: options });
  },
  createTransaction (data) {
    const path = api.transaction;
    return axios.post(path, data);
  },
  saveTransaction (data) {
    const path = api.transaction;
    return axios.put(path, data);
  }
};
