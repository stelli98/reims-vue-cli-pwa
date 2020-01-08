import actions from "@/store/modules/user/actions";
import api from "@/api/user";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;
jest.mock("@/api/user");

describe("Actions for User Module", () => {
  test("GetUserFamilyDetailByFamilyId", async () => {
    api.getUserFamilyDetailByFamilyId = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const expectedValue = data.find(
      d => d.url === url.family + "/92768" && d.method == "GET"
    );
    api.getUserFamilyDetailByFamilyId.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const id = 92768;
    await actions.getUserFamilyDetailByFamilyId({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_USER_FAMILY", expectedValue.data);
  });

  test("downloadPersonalReport actions", () => {
    api.downloadPersonalReport = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
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

  test("updatePersonalProfile actions", () => {
    api.updatePersonalProfile = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const user = {
      username: "stelli",
      password: "stelli123"
    };
    actions.updatePersonalProfile({ rootState }, user);
    expect(api.updatePersonalProfile).toHaveBeenCalledWith(
      user,
      rootState.auth.token
    );
  });

});
