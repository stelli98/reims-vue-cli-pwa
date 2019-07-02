const namespaced = true;
const state = {
  connected: navigator.onLine
};
const getters = {
  connected: state => state.connected
};
const mutations = {
  SET_CONNECTED(state, payload) {
    state.connected = payload;
  }
};
const actions = {
  setConnected({ commit }, payload) {
    commit("SET_CONNECTED", payload);
  }
};

export default { state, getters, mutations, actions, namespaced };
