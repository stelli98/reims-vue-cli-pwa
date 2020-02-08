import user from "@/store/modules/user";

const state = {
  user: {},
  userFamily: document.cookie.replace(
    /(?:(?:^|.*;\s*)userFamily\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  hasVehicle: document.cookie.replace(
    /(?:(?:^|.*;\s*)hasVehicle\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  )
};

describe("user store", () => {
  test("user initial state", () => {
    expect(user.state).toEqual(state);
  });
});
