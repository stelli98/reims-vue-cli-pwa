import axios from "axios";
import config from "@/config";
import offlineService from "@/api/transaction-offline";

const api = config.api.transactions;

const apiClient = axios.create({
  // baseURL: "http://localhost:9095",
  headers: {
    Authorization: document.cookie
  }
});
// process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getTransaction (id) {
    const path = api.transaction;
    return apiClient.get(`${path}/${id}`);
  },
  getTransactions (options) {
    const path = api.transaction;
    return apiClient.get(path, { params: options });
  },
<<<<<<< HEAD
  createTransaction (data) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios.post(path, data)
        .catch(() => {
          return offlineService.storeImageOffline(data);
        });
    } else {
      return offlineService.storeImageOffline(data);
    }
  },
  saveTransaction (data) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios.put(path, data).catch(() => {
        return offlineService.storeFormOffline(data);
      });
    } else {
      return offlineService.storeFormOffline(data);
    }
=======
  createTransaction(data) {
    console.log(data);
    const path = api.transaction;
    return apiClient.post(path, data);
  },
  saveTransaction(data) {
    const path = api.transaction;
    return apiClient.put(path, data);
>>>>>>> 9d2e88877c380de5591df90d16659e545232fae0
  },
  deleteTransaction (id) {
    const path = api.transaction;
    console.log("delete id :" + id);
<<<<<<< HEAD
    return axios.delete(`${path}/${id}`);
  },
  isOnline () {
    return navigator.onLine;
=======
    return apiClient.delete(`${path}/${id}`);
>>>>>>> 9d2e88877c380de5591df90d16659e545232fae0
  }
};
