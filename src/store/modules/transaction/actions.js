import transactionApi from "@/api/transaction";

export default {
  setImage ({ commit }, img) {
    commit("SET_IMAGE", img);
  },
  setOCRResultType ({ commit }, data) {
    commit("SET_OCR_RESULT_TYPE", data);
  },
  setFormEmpty ({ commit }, data) {
    commit("SET_OCR_RESULT", data);
  },
  createTransaction: async ({ commit, rootState }, image) => {
    const { token } = rootState.auth;
    const { data } = await transactionApi.createTransaction(image, token);
    commit("SET_OCR_RESULT", data);
    commit("SET_OCR_RESULT_TYPE", data.data.category);
    return data;
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
  deleteTransaction: ({ rootState }, id) => {
    const { token } = rootState.auth;
    const response = transactionApi.deleteTransaction(id, token);
    console.log('delete', response)
    return response
  }
};
