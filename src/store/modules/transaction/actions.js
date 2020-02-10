import transactionApi from "@/api/transaction";

export default {
  setImage({ commit }, img) {
    commit("SET_IMAGE", img);
  },
  setImages({ commit }, img) {
    commit("SET_IMAGES", img);
  },
  setFormEmpty({ commit }, data) {
    commit("SET_OCR_RESULT", data);
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
  getTransactionsByCategory: async (
    { commit, rootState },
    [options, isOCR]
  ) => {
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
  deleteTransaction: async ({ rootState }, [id, isOCR]) => {
    const { token } = rootState.auth;
    await transactionApi.deleteTransaction(id, isOCR, token);
  },
  createMedicalTransaction: async ({ rootState }, medical) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.createMedicalTransaction(medical, token);
    return data;
  }
};
