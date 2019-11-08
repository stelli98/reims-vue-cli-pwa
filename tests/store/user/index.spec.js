import user from "@/store/modules/user";

const state = {
  users: [],
  user: {},
  pagination: {},
  userFamilies:[],
  userFamily: {}
};

describe("user store", () => {
  test("user initial state", () => {
    expect(user.state).toEqual(state);
  });
});
