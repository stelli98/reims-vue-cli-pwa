import authApi from "@/api/auth";

export default {
  login: async ({ commit }, user) => {
    const data = await authApi.login(user);
    commit("SET_TOKEN", data.headers.authorization);
    commit("SET_ROLE", data.data.role);
    commit("SET_ID", data.data.id);
  },
  logout: async ({ commit }) => {
    await authApi.logout();
    commit("SET_ID", "");
    commit("SET_ROLE", "");
    commit("SET_TOKEN", "");
  }
};
