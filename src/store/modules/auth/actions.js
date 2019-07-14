import authApi from "@/api/auth";

export default {
  login: async ({ commit }, user) => {
    const data = await authApi.login(user);
    document.cookie = data.headers.authorization;
    commit("SET_ACTIVE_USER", data);
    commit("SET_TOKEN", data.headers.authorization);
  },
  logout: async ({ commit }) => {
    await authApi.logout();
    commit("SET_ACTIVE_USER", { id: "", role: "" });
    commit("SET_TOKEN", "");
    document.cookie = "";
  }
};
