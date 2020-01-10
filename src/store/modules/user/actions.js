import userApi from "@/api/user";

export default {
  getUserFamily: async ({ commit, rootState }, id) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUserFamily(id, token);
    commit("SET_USER_FAMILY", data);
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
