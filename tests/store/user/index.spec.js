import user from "@/store/modules/user";

const state = {
  users: [],
  user: {},
  pagination: {},
  userFamily:[]
};

describe("user store", () => {
  test("user initial state", () => {
    expect(user.state).toEqual(state);
  });
});
