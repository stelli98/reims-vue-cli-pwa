import userApi from "@/api/user";

export default {
  createUser: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await userApi.createUser(data, token);
    return response;
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
  },
  getUserFamilyDetailByUserId: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getFamilyDetailByUserId(id, token);
    commit("SET_USER_FAMILIES", data);
  },
  getUserFamilyDetailByFamilyId: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getFamilyDetailByFamilyId(id, token);
    commit("SET_USER_FAMILY", data);
  },
  addFamilyToUser: async ({ rootState }, [id, data]) => {
    const { token } = rootState.auth;
    await userApi.addFamilyToUser(id, data, token);
  },
  updateUserFamily: async ({ rootState }, [id, data]) => {
    const { token } = rootState.auth;
    await userApi.updateUserFamily(id, data, token);
  },
  deleteUserFamily: async ({ rootState }, id) => {
    const { token } = rootState.auth;
    await userApi.deleteUserFamilyById(id, token);
  }
};
