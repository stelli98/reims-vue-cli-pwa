import actions from "@/store/modules/notification/actions";

const notification = {
  id: 1,
  type: "success",
  message: "Image has been submitted."
};

describe("Actions for Notification module", () => {
  test("add notification", () => {
    const commit = jest.fn();
    actions.addNotification({ commit }, notification);
    expect(commit).toHaveBeenCalledWith("PUSH_NOTIFICATION", notification);
  });
  test("remove notification", () => {
    const commit = jest.fn();
    actions.removeNotification({ commit }, notification);
    expect(commit).toHaveBeenCalledWith("DELETE_NOTIFICATION", notification);
  });
});
