import authApi from "@/api/auth";

export default {
  login: async ({ commit }, user) => {
    const data = await authApi.login(user);
    commit("SET_TOKEN", data.headers.authorization);
    commit("SET_ROLE", data.data.role);
    commit("SET_ID", data.data.id);
    commit("SET_USERNAME", data.data.username);
  },
  logout: async ({ commit, rootState }) => {
    const { token } = rootState.auth;
    await authApi.logout(token);
    commit("SET_ID", "");
    commit("SET_ROLE", "");
    commit("SET_TOKEN", "");
    commit("SET_USERNAME", "");
    commit("SET_HAS_VEHICLE", "");
  }
};
