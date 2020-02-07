import userApi from "@/api/user";

export default {
  getUserFamily: async ({ commit, rootState }) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUserFamily(token);
    commit("SET_USER_FAMILY", data);
  },
  downloadPersonalReport: ({ rootState }, options) => {
    const { token } = rootState.auth;
    return userApi.downloadPersonalReport(options, token);
  },
  updatePersonalProfile: async ({ rootState }, data) => {
    const { token } = rootState.auth;
    const response = await userApi.updatePersonalProfile(data, token);
    return response;
  },
  getViewImage: async ({ rootState }, link) => {
    const { token } = rootState.auth;
    return await userApi.getViewImage(link, token);
  }
};
