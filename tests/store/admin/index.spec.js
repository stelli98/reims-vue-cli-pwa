import admin from "@/store/modules/admin";

const state = {
  users: [],
  user: {},
  pagination: {},
  userFamilies: [],
  userFamily: {}
};

describe("user store", () => {
  test("user initial state", () => {
    expect(admin.state).toEqual(state);
  });
});
