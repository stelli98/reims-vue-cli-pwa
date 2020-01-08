import actions from "@/store/modules/admin/actions";
import api from "@/api/admin";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;
jest.mock("@/api/admin");

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
      sort_by: "createdAt",
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

  test("Get user family data", async () => {
    api.getFamilyDetailByUserId = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const expectedValue = data.find(
      d => d.url === url.family + "?user-id=1559058600" && d.method == "GET"
    );
    api.getFamilyDetailByUserId.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const id = 1559058600;
    await actions.getUserFamilyDetailByUserId({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_USER_FAMILIES", expectedValue.data);
  });

  test("GetUserFamilyDetailByFamilyId", async () => {
    api.getFamilyDetailByFamilyId = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const expectedValue = data.find(
      d => d.url === url.family + "/92768" && d.method == "GET"
    );
    api.getFamilyDetailByFamilyId.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const id = 92768;
    await actions.getUserFamilyDetailByFamilyId({ commit, rootState }, id);
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
    expect(api.deleteUser).toHaveBeenCalledWith(id, rootState.auth.token);
  });

 
  test("addFamilyToUser actions", () => {
    api.addFamilyToUser = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const id = 1;
    const userFamilies = [
      {
        name: "Stelli",
        relationship: "CHILDREN",
        dateOfBirth: ""
      }
    ];
    actions.addFamilyToUser({ rootState }, [id, userFamilies]);
    expect(api.addFamilyToUser).toHaveBeenCalledWith(
      id,
      userFamilies,
      rootState.auth.token
    );
  });

  test("updateUserFamily actions", () => {
    api.updateUserFamily = jest.fn();

    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const id = 1;
    const userFamilies = [
      {
        name: "Stelli",
        relationship: "CHILDREN",
        dateOfBirth: ""
      }
    ];
    actions.updateUserFamily({ rootState }, [id, userFamilies]);
    expect(api.updateUserFamily).toHaveBeenCalledWith(
      id,
      userFamilies,
      rootState.auth.token
    );
  });

  test("Delete user family", async () => {
    api.deleteUserFamilyById = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    const id = 1559058600;
    await actions.deleteUserFamily({ rootState }, id);
    expect(api.deleteUserFamilyById).toHaveBeenCalledWith(id, rootState.auth.token);
  });

});
