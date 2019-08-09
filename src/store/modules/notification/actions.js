export default {
  addNotification({ commit }, notification) {
    commit("PUSH_NOTIFICATION", notification);
  },
  removeNotification({ commit }, notificationToRemove) {
    commit("DELETE_NOTIFICATION", notificationToRemove);
  }
};
