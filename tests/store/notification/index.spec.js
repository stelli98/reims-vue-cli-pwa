import notification from "@/store/modules/notification";

const state = {
  notifications: []
};

describe("notification store", () => {
  test("notification initial state", () => {
    expect(notification.state).toEqual(state);
  });
});
