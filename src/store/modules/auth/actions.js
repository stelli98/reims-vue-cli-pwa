import authApi from "@/api/auth";

export default {
  login: async ({ commit }, user) => {
    const data = await authApi.login(user);
    commit("SET_TOKEN", data.headers.authorization);
    commit("SET_ACTIVE_USER", data.data);
    document.cookie = `token=${data.headers.authorization}`;
  }
};
