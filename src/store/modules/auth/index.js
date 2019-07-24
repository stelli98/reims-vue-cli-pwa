import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;
const state = {
  id: document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
  role: document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
  token: document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1")
};

export default { state, actions, mutations, namespaced };
