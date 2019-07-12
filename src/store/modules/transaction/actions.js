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
  createTransaction: async ({ commit }, image) => {
    const { data } = await transactionApi.createTransaction(image)
    commit("SET_OCR_RESULT", data);
    commit("SET_OCR_RESULT_TYPE", data.data.category);
    return data;
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
  saveTransaction: async ({ }, transaction) => {
    const { data } = await transactionApi.saveTransaction(transaction);
    return data;
  },
  deleteTransaction: ({ }, id) => {
    transactionApi.deleteTransaction(id);
  }
};
