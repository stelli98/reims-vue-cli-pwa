import userApi from "@/api/user";

export default {
  getVehicleData: async ({ commit, rootState }) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUserPersonalData(token);
    commit("SET_HAS_VEHICLE", !!data.data.vehicle && !!data.data.license);
  },
  getUserFamily: async ({ commit, rootState }) => {
    const { token } = rootState.auth;
    const { data } = await userApi.getUserFamily(token);
    commit("SET_USER_FAMILY", JSON.stringify(data.data));
  },
  downloadPersonalReport: ({ rootState }, options) => {
    const { token } = rootState.auth;
    return userApi.downloadPersonalReport(options, token);
  },
  getViewImage: async ({ rootState }, link) => {
    const { token } = rootState.auth;
    return await userApi.getViewImage(link, token);
  },
  changePassword: ({ rootState }, [role, data]) => {
    const { token } = rootState.auth;
    userApi.changePassword(role, data, token);
  }
};
