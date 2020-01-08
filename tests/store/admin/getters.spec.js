import getters from "@/store/modules/admin/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;

describe("user getters", () => {
  test("Get users from user module", () => {
    const expectedValue = data.find(d => d.url == url.user && d.method == "GET");
    const state = {
      users: expectedValue.data
    };
    const users = getters.users(state);
    expect(users).toBe(state.users);
  });

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

  test("Get paginations from user module", () => {
    const expectedValue = data.find(d => d.url == url.user && d.method == "GET");
    const state = {
      pagination: expectedValue.data.pagination
    };
    const pagination = getters.pagination(state);
    expect(pagination).toBe(state.pagination);
  });

  test("Get userFamilies from user module", () => {
    const expectedValue = data.find(
      d => d.url == url.family + "?user-id=1559058600" && d.method == "GET"
    );
    const state = {
      userFamilies: expectedValue.data
    };
    const userFamilies = getters.userFamilies(state);
    expect(userFamilies).toBe(state.userFamilies);
  });

  test("Get userFamilies from user module", () => {
    const expectedValue = data.find(
      d => d.url == url.family + "?user-id=1559058600" && d.method == "GET"
    );
    const state = {
      userFamilies: expectedValue.data
    };
    const userFamilies = getters.userFamilies(state);
    expect(userFamilies).toBe(state.userFamilies);
  });

  test("Get userFamily from user module", () => {
    const expectedValue = data.find(
      d => d.url == url.family + "/92768" && d.method == "GET"
    );
    const state = {
      userFamily: expectedValue.data
    };
    const userFamily = getters.userFamily(state);
    expect(userFamily).toBe(state.userFamily);
  });
});
