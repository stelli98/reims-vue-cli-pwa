import axios from "axios";
import config from "@/config";
import offlineService from "@/api/transaction-offline";
import auth from "@/store/modules/auth";

const api = config.api.transactions;

const apiClient = axios.create({
  headers: {
    Authorization: auth.state.token
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
  },
  deleteTransaction (id) {
    const path = api.transaction;
    console.log("delete id :" + id);
    return axios.delete(`${path}/${id}`);
  },
  isOnline () {
    return navigator.onLine;
  }
};
