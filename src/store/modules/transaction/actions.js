import transactionApi from "@/api/transaction";
import idbs from "@/api/indexedDBService";

export default {
  setImage({ commit }, img) {
    commit("SET_IMAGE", img);
  },
  setImageOffline({ commit, dispatch }, img) {
    commit("SET_IMAGE_OFFLINE", img);
    dispatch("storeToIndexedDB");
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
  async storeToIndexedDB({ state }) {
    try {
      const data = {
        id: Date.now(),
        image: state.offlineImages
      };
      idbs.saveToStorage("images", data);
    } catch (e) {
      console.log(e);
    }
  },
  async getAllData() {
    const data = await idbs.checkStorage();
    console.log(data);
  }
};
