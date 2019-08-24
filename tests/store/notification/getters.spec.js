import getters from "@/store/modules/notification/getters";

describe("notification getters", () => {
  test("Get notification from notification module", () => {
    const expectedValue = [
      {
        id: 1,
        type: "success",
        message: "Image has been submitted."
      }
    ];
    const state = {
      notifications: expectedValue
    };
    const notifications = getters.notifications(state);
    expect(notifications).toBe(state.notifications);
  });
});
