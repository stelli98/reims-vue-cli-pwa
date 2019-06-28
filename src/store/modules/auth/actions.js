import userApi from "@/api/user";

export default {
  login: ({ commit }, user) => {
    const { data } = userApi.login(user);
    commit("SET_TOKEN", data);
    commit("SET_ACTIVE_USER", data);
  }
};
