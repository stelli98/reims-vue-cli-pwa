import admin from "@/store/modules/admin";

const state = {
  users: [],
  userFamily: {}
};

describe("user store", () => {
  test("user initial state", () => {
    expect(admin.state).toEqual(state);
  });
});
