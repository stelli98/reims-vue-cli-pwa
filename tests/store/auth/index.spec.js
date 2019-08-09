import auth from "@/store/modules/auth";

const state = {
  id: document.cookie.replace(
    /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  role: document.cookie.replace(
    /(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  ),
  token: document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  )
};

describe("auth store", () => {
  test("auth initial state", () => {
    expect(auth.state).toEqual(state);
  });
});
