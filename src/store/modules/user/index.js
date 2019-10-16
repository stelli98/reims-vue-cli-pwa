import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  users: [],
  user: {},
  pagination: {},
  userFamily: []
};

export default { state, actions, mutations, getters, namespaced };
