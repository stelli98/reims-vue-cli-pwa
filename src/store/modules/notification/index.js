import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  notifications: []
};

export default { state, actions, mutations, getters, namespaced };
