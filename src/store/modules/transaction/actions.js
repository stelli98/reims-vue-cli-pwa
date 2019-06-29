import transactionApi from "@/api/transaction";
import idbs from "@/api/indexedDBService";

export default {
  setImage({ commit }, img) {
    commit("SET_IMAGE", img);
  },
  setImageOffline({ commit, dispatch }, img) {
    console.log(img);
    commit("SET_IMAGE_OFFLINE", img);
    dispatch("storeToIndexedDB", "offlineImages");
  },
  setOCRResultType({ commit }, data) {
    commit("SET_OCR_RESULT_TYPE", data);
  },
  createTransaction: async ({ commit }, image) => {
    const { data } = await transactionApi.createTransaction(image);
    commit("SET_OCR_RESULT", data);
    commit("SET_OCR_RESULT_TYPE", data.data.category);
  },
  getTransaction: async ({ commit }, id) => {
    const { data } = await transactionApi.getTransaction(id);
    commit("SET_TRANSACTION", data);
  },
  getTransactions: async ({ commit }, options) => {
    const { data } = await transactionApi.getTransactions(options);
    commit("SET_TRANSACTIONS", data);
    commit("SET_PAGINATION", data);
  },
  saveTransaction: ({}, transaction) => {
    transactionApi.saveTransaction(transaction);
  },
  deleteTransaction: ({}, id) => {
    transactionApi.deleteTransaction(id);
  },
  async storeToIndexedDB({ state }, storeName) {
    try {
      await Promise.all(
        state[storeName].map(item => {
          idbs.saveToStorage(storeName, item);
        })
      );
    } catch (e) {
      console.log(e);
    }
  }
};
