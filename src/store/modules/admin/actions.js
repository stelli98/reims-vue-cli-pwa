import adminApi from "@/api/admin";

export default {
  createUser: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await adminApi.createUser(data, token);
    return response;
  },
  getUser: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await adminApi.getUser(id, token);
    commit("SET_USER", data);
  },
  getUsers: async ({ commit, rootState }, options) => {
    const { token } = rootState.auth;
    const { data } = await adminApi.getUsers(options, token);
    commit("SET_USERS", data);
    commit("SET_PAGINATION", data);
  },
  updateUser: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await adminApi.updateUser(data.id, data, token);
    return response;
  },
  deleteUser: async ({ rootState }, id) => {
    const { token } = rootState.auth;
    await adminApi.deleteUser(id, token);
  },
  getUserFamilyDetailByUserId: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await adminApi.getFamilyDetailByUserId(id, token);
    commit("SET_USER_FAMILIES", data);
  },
  getUserFamilyDetailByFamilyId: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await adminApi.getFamilyDetailByFamilyId(id, token);
    commit("SET_USER_FAMILY", data);
  },
  addFamilyToUser: async ({ rootState }, [id, data]) => {
    const { token } = rootState.auth;
    await adminApi.addFamilyToUser(id, data, token);
  },
  updateUserFamily: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    await adminApi.updateUserFamily(data, token);
  },
  deleteUserFamily: async ({ rootState }, id) => {
    const { token } = rootState.auth;
    await adminApi.deleteUserFamilyById(id, token);
  }
};
