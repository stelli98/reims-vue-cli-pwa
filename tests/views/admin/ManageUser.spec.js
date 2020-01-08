import { shallowMount, createLocalVue } from "@vue/test-utils";
import ManageUser from "@/views/admin/ManageUser.vue";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;

describe("ManageUser.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === url.user && d.method == "GET" && d.params.page == 1
  );

  function initializeStore() {
    const admin = initializeAdminStore();
    const auth = initializeAuthStore();
    const store = new Vuex.Store({
      modules: {
        admin,
        auth
      }
    });

    return {
      store,
      state: {
        user: admin.state
      },
      actions: {
        user: admin.actions,
        auth: auth.actions
      },
      getters: {
        user: admin.getters
      }
    };
  }

  function initializeAuthStore() {
    const actions = {
      logout: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeAdminStore() {
    const actions = {
      getUsers: jest.fn()
    };
    const state = {
      users: userData.data,
      pagination: userData.data.page
    };
    const getters = {
      users: state => state.users,
      pagination: state => state.pagination
    };
    const namespaced = true;
    return { state, actions, getters, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stubs: ["UserList", "Pagination"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(ManageUser, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("created Method", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyRouter = jest.spyOn(wrapper.vm.$router, "push");
    const spyActionGetUser = jest.spyOn(store.actions.user, "getUsers");
    expect(spyRouter).toHaveBeenCalled();
    expect(spyActionGetUser).toHaveBeenCalled();
  });

  test("methods changePage", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActionGetUser = jest.spyOn(store.actions.user, "getUsers");
    const spyRouter = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.changePage(2);
    expect(spyRouter).toHaveBeenCalled();
    expect(spyActionGetUser).toHaveBeenCalled();
  });

  test("methods submitSearch", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActionGetUser = jest.spyOn(store.actions.user, "getUsers");
    const spyRouter = jest.spyOn(wrapper.vm.$router, "push");
    const event = {
      target: {
        value: "Fuel"
      }
    };
    wrapper.vm.submitSearch(event);
    expect(spyActionGetUser).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalled();
  });

  test("methods doLogout", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActionLogout = jest.spyOn(store.actions.auth, "logout");
    const spyRouter = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.doLogout();
    expect(spyActionLogout).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalled();
  });

  test("methods updateUser", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      },
      computed: {
        users() {
          return [];
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActionGetUser = jest.spyOn(store.actions.user, "getUsers");
    const spyChangePage = jest.spyOn(wrapper.vm, "changePage");
    await wrapper.vm.updateUser();
    expect(spyActionGetUser).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(spyChangePage).toHaveBeenCalled();
    });
  });
});
