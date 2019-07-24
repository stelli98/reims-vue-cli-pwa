import axios from "axios";
import config from "@/config";
import offlineService from "@/api/transaction-offline";

const api = config.api.transactions;
process.env.NODE_ENV === "development" ? require("@mock-api") : "";

export default {
  getTransaction (id, token) {
    const path = api.transaction;
    return axios.get(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
  getTransactions (options, token) {
    const path = api.transaction;
    return axios.get(path, {
      params: options, headers: {
        Authorization: token
      }
    })
  },
  createTransaction (data, token) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios.post(path, data, {
        headers: {
          Authorization: token
        }
      })
        .catch(() => {
          return offlineService.storeImageOffline(data);
        });
    } else {
      return offlineService.storeImageOffline(data);
    }
  },
  saveTransaction (data, token) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios.put(path, data, {
        headers: {
          Authorization: token
        }
      }).catch(() => {
        return offlineService.storeFormOffline(data);
      });
    } else {
      return offlineService.storeFormOffline(data);
    }
  },
  deleteTransaction (id, token) {
    const path = api.transaction;
    console.log("delete id :" + id);
    return axios.delete(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
  isOnline () {
    return navigator.onLine;
  }
};
