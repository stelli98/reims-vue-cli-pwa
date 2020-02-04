import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  id: document.cookie.replace(
    /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  role: document.cookie.replace(
    /(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  token: document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  username: document.cookie.replace(
    /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  hasVehicle: document.cookie.replace(
    /(?:(?:^|.*;\s*)hasVehicle\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  )
};

export default { state, actions, mutations, getters, namespaced };
