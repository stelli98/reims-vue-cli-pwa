import userApi from "@/api/user";

export default {
  createUser: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await userApi.createUser(data, token);
    return response;
  },
  emptyUser: ({ commit }, data) => {
    commit("SET_USER_EMPTY", data);
  },
  getUser: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUser(id, token);
    commit("SET_USER", data);
  },
  getUsers: async ({ commit, rootState }, options) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUsers(options, token);
    commit("SET_USERS", data);
    commit("SET_PAGINATION", data);
  },
  updateUser: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await userApi.updateUser(data.id, data, token);
    return response;
  },
  deleteUser: async ({ rootState }, id) => {
    const { token } = rootState.auth;
    await userApi.deleteUser(id, token);
  },
  downloadPersonalReport: ({ rootState }, options) => {
    const { token } = rootState.auth;
    userApi.downloadPersonalReport(options, token);
  },
  updatePersonalProfile: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await userApi.updatePersonalProfile(data, token);
    return response;
  }
};
