import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  user: {},
  userFamily: document.cookie.replace(
    /(?:(?:^|.*;\s*)userFamily\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  hasVehicle: document.cookie.replace(
    /(?:(?:^|.*;\s*)hasVehicle\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  )
};

export default { state, actions, mutations, getters, namespaced };
