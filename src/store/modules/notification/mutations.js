let nextId = 1;
export default {
  PUSH_NOTIFICATION (state, notification) {
    state.notifications.push({ ...notification, id: nextId++ });
  },
  DELETE_NOTIFICATION (state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    );
  }
};
