import mutations from "@/store/modules/admin/mutations";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;

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

  test("SET_USERS sets state.user", () => {
    const expectedValue = data.find(
      d => d.url === url.user && d.method === "GET"
    );
    const state = {
      users: []
    };
    mutations.SET_USERS(state, expectedValue);
    expect(state.users).toBe(expectedValue.data);
  });

  test("SET_PAGINATION sets state.paginations", () => {
    const expectedValue = data.find(
      d => d.url === url.user && d.method === "GET"
    );
    const state = {
      pagination: {}
    };
    mutations.SET_PAGINATION(state, expectedValue);
    expect(state.pagination).toBe(expectedValue.paging);
  });

  test("SET_USER_FAMILIES sets state.userFamilies", () => {
    const expectedValue = data.find(
      d =>
        d.url === url.family + "?user-id=1559058600" && d.method === "GET"
    );
    const state = {
      userFamilies: []
    };
    mutations.SET_USER_FAMILIES(state, expectedValue);
    expect(state.userFamilies).toBe(expectedValue.data);
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
