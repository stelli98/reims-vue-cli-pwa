import Vue from "vue";
import Vuex from "vuex";
import transaction from "./modules/transaction/index";
import user from "./modules/user/index";
import notification from "./modules/notification/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    transaction,
    user,
    notification
  }
});

export default store;
