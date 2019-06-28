export default {
  SET_TOKEN(state, { data }) {
    state.user.token = data;
  },
  SET_ACTIVE_USER(state, { data }) {
    state.user = data;
  }
};
