import Vue from "vue";
import Vuex from "vuex";
import transaction from "./modules/transaction/index";
import user from "./modules/user/index";
import notification from "./modules/notification/index";

import auth from "./modules/auth/index";
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transaction,
    user,
    auth,
    notification
  }
});

export default store;
