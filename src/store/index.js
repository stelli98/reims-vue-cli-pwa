import Vue from 'vue';
import Vuex from 'vuex';
import transaction from './modules/transaction/index';
import user from './modules/user/index';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        transaction,
        user
    }
});

export default store;
