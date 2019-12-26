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
  getTransactionByCategory: async ({ commit, rootState }, [id, isOCR]) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getTransactionByCategory(
      id,
      isOCR,
      token
    );
    commit("SET_TRANSACTION", data);
  },
  getTransactionsByCategory: async ({ commit, rootState },[options, isOCR]) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getTransactionsByCategory(
      options,
      isOCR,
      token
    );
    commit("SET_TRANSACTIONS", data);
    commit("SET_PAGINATION", data);
  },
  saveTransaction: async ({ rootState }, transaction) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.saveTransaction(transaction, token);
    return data;
  },
  deleteTransaction: async ({ rootState }, id) => {
    const { token } = rootState.auth;
    await transactionApi.deleteTransaction(id, token);
  },
  getViewImage: async ({ commit, rootState }, link) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.getViewImage(link, token);
    commit("SET_VIEW_IMAGE", data);
  },
  createMedicalTransaction: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    await transactionApi.createMedicalTransaction(data, token);
  }
};
