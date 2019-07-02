export default {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_ACTIVE_USER(state, { data }) {
    state.user = data;
  }
};
