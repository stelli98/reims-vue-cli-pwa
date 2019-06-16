import transactionApi from '@/api/transaction';

export default {
    setImage ({ commit }, img) {
        commit('SET_IMAGE', img);
    },
    setOCRResultType ({ commit }, data) {
        commit('SET_OCR_RESULT_TYPE', data);
    },
    createTransaction: async ({ commit }, image) => {
        const { data } = await transactionApi.createTransaction(image);
        commit('SET_OCR_RESULT', data);
        commit('SET_OCR_RESULT_TYPE', data.data.category);
    },
    getTransaction: async ({ commit }, id) => {
        const { data } = await transactionApi.getTransaction(id);
        commit('SET_TRANSACTION', data);
    },
    getTransactions: async ({ commit }, options) => {
        const { data } = await transactionApi.getTransactions(options);
        commit('SET_TRANSACTIONS', data);
        commit('SET_PAGINATION', data);
    },
    saveTransaction: ({ commit }, transaction) => {
        transactionApi.saveTransaction(transaction);
    }
};
