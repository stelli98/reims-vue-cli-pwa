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
  SET_USER_FAMILIES(state, { data }){
    state.userFamilies = data
  },
  SET_USER_FAMILY(state, { data }){
    state.userFamily = data
  }
};
