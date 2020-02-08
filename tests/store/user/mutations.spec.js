import mutations from "@/store/modules/user/mutations";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("mutations", () => {
  test("SET_USER sets state.user", () => {
    const expectedValue = {
      name: "stelli",
      password: "stelli"
    }
    const state = {
      user: {}
    };
    mutations.SET_USER(state, expectedValue);
    expect(state.user).toBe(expectedValue.data);
  });

  test("SET_USER_FAMILY sets state.userFamily", () => {
    const expectedValue = data.find(
      d =>
        d.url === url.family && d.method === "GET"
    );
    const state = {
      userFamily: {}
    };
    mutations.SET_USER_FAMILY(state, JSON.stringify(expectedValue.data));
    expect(state.userFamily).toBe(JSON.stringify(expectedValue.data));
  });

  test("SET_HAS_VEHICLE sets state.hasVehicle", () => {
    const expectedValue = false;
    const state = {
      hasVehicle: document.cookie.replace(
        /(?:(?:^|.*;\s*)hasVehicle\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    };
    mutations.SET_HAS_VEHICLE(state, expectedValue);
    expect(state.hasVehicle).toEqual(expectedValue);
  });
});
