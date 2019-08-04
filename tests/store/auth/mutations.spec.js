import mutations from "@/store/modules/auth/mutations";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.auth;

describe("mutations for transaction module", () => {
  test("SET_TOKEN sets state.token", () => {
    const expectedValue = data.find(
      d => d.url === url.login && d.method === "POST"
    );
    const state = {
      token: document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    };
    mutations.SET_TOKEN(state, expectedValue.headers.authorization);
    expect(state.token).toEqual(expectedValue.headers.authorization);
  });

  test("SET_ID sets state.id", () => {
    const expectedValue = data.find(
      d => d.url === url.login && d.method === "POST"
    );
    const state = {
      id: document.cookie.replace(
        /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    };
    mutations.SET_ID(state, expectedValue.data.id);
    expect(state.id).toEqual(expectedValue.data.id);
  });

  test("SET_ROLE sets state.role", () => {
    const expectedValue = data.find(
      d => d.url === url.login && d.method === "POST"
    );
    const state = {
      role: document.cookie.replace(
        /(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      )
    };
    mutations.SET_ROLE(state, expectedValue.data.role);
    expect(state.role).toEqual(expectedValue.data.role);
  });
});
