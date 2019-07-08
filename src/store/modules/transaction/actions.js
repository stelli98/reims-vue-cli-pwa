import transactionApi from "@/api/transaction";

const response = {
  category: "FUEL",
  date: "",
  type: "",
  volume: 0,
  unitPrice: 0,
  title: ""
};
export default {
  setImage({ commit }, img) {
    commit("SET_IMAGE", img);
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
  saveTransaction: async ({ dispatch }, transaction) => {
    const { data } = await transactionApi.saveTransaction(transaction);

    const notification = {
      type: "success",
      message: `'${data.title}' form has been submitted.`
    };
    console.log("X", data);
    dispatch("notification/addNotification", notification, { root: true });
  },
  deleteTransaction: ({}, id) => {
    transactionApi.deleteTransaction(id);
  }
};
