import actions from "@/store/modules/user/actions";
import api from "@/api/user";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;
const rootState = {
  auth: {
    token: "Bearer 123"
  }
};
jest.mock("@/api/user");

describe("Actions for User Module", () => {
  test("GetUserFamily", async () => {
    api.getUserFamily = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.family && d.method == "GET"
    );
    api.getUserFamily.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const id = 92768;
    await actions.getUserFamily({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_USER_FAMILY", expectedValue.data);
  });

  test("downloadPersonalReport actions", () => {
    api.downloadPersonalReport = jest.fn();
    const options = {
      start: 1565096633000,
      end: 1565442233000
    };
    actions.downloadPersonalReport({ rootState }, options);
    expect(api.downloadPersonalReport).toHaveBeenCalledWith(
      options,
      rootState.auth.token
    );
  });

  test("changePassword actions", () => {
    api.changePassword = jest.fn();
    const user = {
      username: "stelli",
      password: "stelli123"
    };
    actions.changePassword({ rootState }, user);
    expect(api.changePassword).toHaveBeenCalledWith(
      user,
      rootState.auth.token
    );
  });

  test("getViewImage actions", () => {
    api.getViewImage = jest.fn();
    const link = "storage/image.jpg";
    actions.getViewImage({ rootState }, link);
    expect(api.getViewImage).toHaveBeenCalledWith(
      link,
      rootState.auth.token
    );
  });
});
