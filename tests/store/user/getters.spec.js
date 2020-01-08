import getters from "@/store/modules/user/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("user getters", () => {
  test("Get user from user module", () => {
    const expectedValue = data.find(d => d.url == url.user + "/1559058600");
    const state = {
      user: expectedValue.data
    };
    const user = getters.user(state);
    expect(user).toBe(state.user);
  });

  test("Get userFamily from user module", () => {
    const expectedValue = data.find(
      d => d.url == url.family + "?user-id=1559058600" && d.method == "GET"
    );
    const state = {
      userFamily: expectedValue.data
    };
    const userFamily = getters.userFamily(state);
    expect(userFamily).toBe(state.userFamily);
  });
});
