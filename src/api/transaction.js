import axios from "axios";
import config from "@/config";
import offlineService from "@/api/transaction-offline";

const api = config.api.transactions;

export default {
  getTransactionByCategory(id, isOCR, token) {
    const path = isOCR ? api.transaction : api.medical;
    return axios.get(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
  getTransactionsByCategory(options, isOCR, token) {
    const path = isOCR ? api.transaction : api.medical;
    return axios.get(path, {
      params: options,
      headers: {
        Authorization: token
      }
    });
  },
  createTransaction(data, token) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios
        .post(path, data, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
          errorHandle: false
        })
        .catch(() => {
          return offlineService.storeImageOffline(data);
        });
    } else {
      return offlineService.storeImageOffline(data);
    }
  },
  saveTransaction(data, token) {
    if (this.isOnline()) {
      const path = api.transaction;
      return axios
        .put(path, data, {
          headers: {
            Authorization: token
          },
          errorHandle: false
        })
        .catch(() => {
          return offlineService.storeFormOffline(data);
        });
    } else {
      return offlineService.storeFormOffline(data);
    }
  },
  deleteTransaction(id, isOCR ,token) {
    const path = isOCR ? api.transaction : api.medical;
    return axios.delete(`${path}/${id}`, {
      headers: {
        Authorization: token
      }
    });
  },
  createMedicalTransaction(data, token) {
    const path = api.medical;
    return axios.post(path, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    });
  },
  isOnline() {
    return navigator.onLine;
  }
};
