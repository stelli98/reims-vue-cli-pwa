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

  test("SET_USER_EMPTY sets state.user", () => {
    const expectedValue = {
      username: "",
      password: "",
      role: ""
    };
    const state = {
      user: {}
    };
    mutations.SET_USER_EMPTY(state, expectedValue);
    expect(state.user).toBe(expectedValue);
  });


  test('DELETE_USER remove deleted id from state.users', () => {
    const initialValue = data.find(d => d.url === url.user && d.method === "GET")
    const state = {
      users: initialValue.data
    }
    const expectedValue = initialValue.data.filter(data => data.id !== 1559058600)
    mutations.DELETE_USER(state, 1559058600)
    expect(state.users).toEqual(expectedValue)
  })
});
