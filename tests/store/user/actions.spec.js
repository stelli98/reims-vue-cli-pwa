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
  test("getVehicleData actions", async () => {
    api.getUserPersonalData = jest.fn();
    const expectedValue = data.find(d => d.url === url.user);
    api.getUserPersonalData.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getVehicleData({ commit, rootState });
    expect(commit).toHaveBeenCalledWith("SET_HAS_VEHICLE", false);
  });

  test("GetUserFamily", async () => {
    api.getUserFamily = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.family && d.method == "GET"
    );
    api.getUserFamily.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getUserFamily({ commit, rootState });
    expect(commit).toHaveBeenCalledWith(
      "SET_USER_FAMILY",
      JSON.stringify(expectedValue.data.data)
    );
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
    const newPassword = "stelli123";
    const role = "user";
    actions.changePassword({ rootState }, [role, newPassword]);
    expect(api.changePassword).toHaveBeenCalledWith(
      role,
      newPassword,
      rootState.auth.token
    );
  });

  test("getViewImage actions", () => {
    api.getViewImage = jest.fn();
    const link = "storage/image.jpg";
    actions.getViewImage({ rootState }, link);
    expect(api.getViewImage).toHaveBeenCalledWith(link, rootState.auth.token);
  });
});
