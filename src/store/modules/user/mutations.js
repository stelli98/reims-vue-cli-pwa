export default {
  SET_USER(state, { data }) {
    state.user = data;
  },
  SET_USERS(state, { data }) {
    state.users = data;
  },
  SET_PAGINATION(state, { paging }) {
    state.pagination = paging;
  },
  SET_USER_EMPTY(state, data) {
    state.user = data;
  },
  DELETE_USER(state, id) {
    state.users = state.users.filter(x => x.id != id);
  },
  SET_USER_FAMILY(state, { data }){
    state.userFamily = data
  }

};
