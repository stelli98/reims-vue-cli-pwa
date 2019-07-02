import actions from "./actions";
import mutations from "./mutations";
// import getters from "./getters";

const namespaced = true;
const state = {
  user: {
    id: "",
    username: "",
    role: ""
  },
  token: document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  )
};

export default { state, actions, mutations, namespaced };
