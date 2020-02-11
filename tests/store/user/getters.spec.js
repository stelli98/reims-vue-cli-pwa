import getters from "@/store/modules/user/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("user getters", () => {
  test("Get user from user module", () => {
    const expectedValue =  {
      name: "stelli",
      password: "stelli"
    }
    const state = {
      user: expectedValue.data
    };
    const user = getters.user(state);
    expect(user).toBe(state.user);
  });

  test("Get userFamily from user module", () => {
    const expectedValue = data.find(
      d => d.url == url.family && d.method == "GET"
    );
    const state = {
      userFamily: JSON.stringify(expectedValue.data)
    };
    const userFamily = getters.userFamily(state);
    expect(userFamily).toEqual(JSON.parse(state.userFamily));
  });

  test("Get hasVehicle from auth module", () => {
    const state = {
      hasVehicle: false
    };
    const hasVehicle = getters.hasVehicle(state);
    expect(hasVehicle).toBe(state.hasVehicle);
  });
});
