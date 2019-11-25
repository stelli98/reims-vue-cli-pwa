import transactionApi from "@/api/transaction";

export default {
  setImage({ commit }, img) {
    commit("SET_IMAGE", img);
  },
  setImages({ commit }, img) {
    commit("SET_IMAGES", img);
  },
  createTransaction: async ({ commit, rootState }, image) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.createTransaction(image, token);
    commit("SET_OCR_RESULT", data);
  },
  getTransaction: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getTransaction(id, token);
    commit("SET_TRANSACTION", data);
  },
  getTransactions: async ({ commit, rootState }, options) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getTransactions(options, token);
    commit("SET_TRANSACTIONS", data);
    commit("SET_PAGINATION", data);
  },
  saveTransaction: async ({ rootState }, transaction) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.saveTransaction(transaction, token);
    return data;
  },
  deleteTransaction: ({ commit, rootState }, id) => {
    commit("DELETE_TRANSACTION", id);
    const { token } = rootState.auth;
    transactionApi.deleteTransaction(id, token);
  },
  getViewImage: async ({ commit, rootState }, link) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getViewImage(link, token);
    commit("SET_VIEW_IMAGE", data);
  },
  createMedicalTransaction: async ({ rootState },data) => {
    const { token } = rootState.auth;
    await transactionApi.createMedicalTransaction(data, token);
  }
};
