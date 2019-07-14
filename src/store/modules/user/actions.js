import userApi from "@/api/user";

export default {
  createUser: async ({ }, data) => {
    const response = await userApi.createUser(data);
    return response
  },
  emptyUser: ({ commit }, data) => {
    commit("SET_USER_EMPTY", data);
  },
  getUser: async ({ commit }, id) => {
    const { data } = await userApi.getUser(id);
    commit("SET_USER", data);
  },
  getUsers: async ({ commit }, options) => {
    const { data } = await userApi.getUsers(options);
    commit("SET_USERS", data);
    commit("SET_PAGINATION", data);
  },
  updateUser: async ({ }, data) => {
    const response = await userApi.updateUser(data.id, data);
    return response
  },
  changePassword: ({ }, data) => {
    userApi.changePassword(data);
  },
  deleteUser: async ({ }, id) => {
    const response = userApi.deleteUser(id);
    return response;
  }
};
