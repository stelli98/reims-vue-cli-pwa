import userApi from "@/api/user";

export default {
  createUser: ({}, data) => {
    userApi.createUser(data);
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
  updateUser: ({}, data) => {
    console.log(data);
    const { response } = userApi.updateUser(data.id, data);
    console.log(response);
  },
  changePassword: ({}, data) => {
    userApi.changePassword(data);
  },
  deleteUser: ({}, id) => {
    userApi.deleteUser(id);
  }
};
