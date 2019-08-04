import actions from "@/store/modules/auth/actions";
import api from "@/api/auth";
import data from "@/api-mock/mock-data";
import config from "@/config";
const url = config.api.auth;
jest.mock("@/api/auth");

describe("Actions for Auth Module", () => {
  test("login", async () => {
    api.login = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.login && d.method == "POST"
    );
    api.login.mockResolvedValue(expectedValue);
    const form = {
      username: "Hefriza Munaf",
      password: "123456"
    };
    const commit = jest.fn();
    await actions.login({ commit }, form);
    expect(commit).toHaveBeenCalledWith(
      "SET_TOKEN",
      expectedValue.headers.authorization
    );
    expect(commit).toHaveBeenCalledWith("SET_ROLE", expectedValue.data.role);
    expect(commit).toHaveBeenCalledWith("SET_ID", expectedValue.data.id);
  });

  test("logout", async () => {
    api.logout = jest.fn();
    const commit = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    await actions.logout({ commit, rootState });
    expect(commit).toHaveBeenCalledWith("SET_TOKEN", "");
    expect(commit).toHaveBeenCalledWith("SET_ROLE", "");
    expect(commit).toHaveBeenCalledWith("SET_ID", "");
  });
});
