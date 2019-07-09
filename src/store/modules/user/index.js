import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;
const state = {
  users: [],
  user: {},
  pagination: {}
};

export default { state, actions, mutations, namespaced };
