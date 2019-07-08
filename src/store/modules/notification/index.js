import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;
const state = {
  notifications: []
};

export default { state, actions, mutations, namespaced };
