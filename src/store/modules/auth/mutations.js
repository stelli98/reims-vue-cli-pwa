const d = new Date();
d.setTime(d.getTime() + 604800000);
const expires = d.toGMTString();

export default {
  SET_TOKEN(state, token) {
    document.cookie = `token=${token};expires=${expires}`;
    state.token = token;
  },
  SET_ID(state, id) {
    document.cookie = `id=${id};expires=${expires}`;
    state.id = id;
  },
  SET_ROLE(state, role) {
    document.cookie = `role=${role};expires=${expires}`;
    state.role = role;
  },
  SET_USERNAME(state, username) {
    document.cookie = `username=${username};expires=${expires}`;
    state.username = username;
  }
};
