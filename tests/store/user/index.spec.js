import user from "@/store/modules/user";

const state = {
  user: {},
  userFamily: []
};

describe("user store", () => {
  test("user initial state", () => {
    expect(user.state).toEqual(state);
  });
});
