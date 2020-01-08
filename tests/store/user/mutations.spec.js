import mutations from "@/store/modules/user/mutations";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("mutations", () => {
  test("SET_USER sets state.user", () => {
    const expectedValue = data.find(
      d => d.url === url.user + "/1559058600" && d.method === "GET"
    );
    const state = {
      user: {}
    };
    mutations.SET_USER(state, expectedValue);
    expect(state.user).toBe(expectedValue.data);
  });

  test("SET_USER_FAMILY sets state.userFamily", () => {
    const expectedValue = data.find(
      d =>
        d.url === url.family + "/92768" && d.method === "GET"
    );
    const state = {
      userFamily: {}
    };
    mutations.SET_USER_FAMILY(state, expectedValue);
    expect(state.userFamily).toBe(expectedValue.data);
  });
});
