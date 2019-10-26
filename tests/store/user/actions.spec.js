import actions from "@/store/modules/user/actions";
import api from "@/api/user";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;
jest.mock("@/api/user");

describe("Actions for User Module", () => {
  test("Create user actions", () => {
    api.createUser = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const user = {
      username: "admin",
      password: "admin",
      role: "ADMIN"
    };
    actions.createUser({ rootState }, user);
    expect(api.createUser).toHaveBeenCalledWith(user, rootState.auth.token);
  });

  test("Get a user", async () => {
    api.getUser = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const expectedValue = data.find(
      d => d.url === url.user + "/1559058600" && d.method == "GET"
    );
    api.getUser.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const id = 1559058600;
    await actions.getUser({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_USER", expectedValue.data);
  });

  test("Get list of user", async () => {
    api.getUsers = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const options = {
      page: 1,
      size: 10,
      sort_by: "created_at",
      search: ""
    };
    const expectedValue = data.find(
      d =>
        d.url === url.user &&
        d.method === "GET" &&
        d.params.page == options.page
    );
    api.getUsers.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getUsers({ commit, rootState }, options);
    expect(commit).toHaveBeenCalledWith("SET_USERS", expectedValue.data);
    expect(commit).toHaveBeenCalledWith("SET_PAGINATION", expectedValue.data);
  });

  test("Get list of user family", async () => {
    api.getFamilyDetailByUserId = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const id = "1559058600"
    const expectedValue = data.find(
      d =>
        d.url === `${url.user}/${id}/family-members` &&
        d.method === "GET" 
    );
    api.getFamilyDetailByUserId.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getUserFamilyDetail({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_USER_FAMILY", expectedValue.data);
  });

  test("Update user actions", () => {
    api.updateUser = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const user = {
      id: 1,
      username: "admin",
      password: "admin",
      role: "ADMIN"
    };
    actions.updateUser({ rootState }, user);
    expect(api.updateUser).toHaveBeenCalledWith(
      user.id,
      user,
      rootState.auth.token
    );
  });

  test("Delete user actions", () => {
    api.deleteUser = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const id = 1;
    const commit = jest.fn();
    actions.deleteUser({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("DELETE_USER", id);
    expect(api.deleteUser).toHaveBeenCalledWith(id, rootState.auth.token);
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
