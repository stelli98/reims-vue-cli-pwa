import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditUserPersonalProfile from "@/views/EditUserPersonalProfile";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("EditUserPersonalProfile.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === url.user + "/1559058600" && d.method == "GET"
  );

  function initializeStore() {
    const actions = {
      getUser: jest.fn(),
      updateUser: jest.fn()
    };
    const state = {
      user: userData.data
    };
    const getters = {
      user: state => state.user
    };
    const store = new Vuex.Store({
      modules: {
        user: {
          state,
          getters,
          actions,
          namespaced: true
        }
      }
    });

    return {
      store,
      state,
      getters,
      actions
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(Vuelidate);
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stubs: ["Datetime","GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(EditUserPersonalProfile, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });


  test("checkUserHaveVehicle method if user doesn't have vehicle", () => {
    const options = {
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    store.state.user = {};
    wrapper = createWrapper(store.store, options);
    wrapper.vm.checkUserHaveVehicle();
    expect(wrapper.vm.user.license).toBe("");
    expect(wrapper.vm.user.vehicle).toBe("");
  });

  test("checkUserHaveVehicle method if user doesn't have vehicle", () => {
    const options = {
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    store.state.user = {
      license : "BL 123 AA",
      vehicle : "Avanza" 
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.checkUserHaveVehicle();
    expect(wrapper.vm.user.license).not.toBe("");
    expect(wrapper.vm.user.vehicle).not.toBe("");
  });

  test("sendEditUserForm method if user data isn't filled", () => {
    const options = {
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    store.state.user = {};
    wrapper = createWrapper(store.store, options);
    const spyUpdateUser = jest.spyOn(store.actions, "updateUser");
    const spyMoveToPreviousPage = jest.spyOn(wrapper.vm, "moveToPreviousPage");
    wrapper.vm.sendEditUserForm();
    expect(spyUpdateUser).not.toHaveBeenCalled();
    expect(spyMoveToPreviousPage).not.toHaveBeenCalled();
  });

  test("sendEditUserForm method if user data is filled", () => {
    const options = {
      mocks: {
        $router: {
          go: jest.fn()
        },
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    store.state.user = {
      username: "Stelli",
      role: "USER",
      dateOfBirth: "2000-08-25T03:00:00.000Z",
      gender: "FEMALE",
      division: "TECHNOLOGY"
    };
    wrapper = createWrapper(store.store, options);
    const spyUpdateUser = jest.spyOn(store.actions, "updateUser");
    const spyMoveToPreviousPage = jest.spyOn(wrapper.vm, "moveToPreviousPage");
    wrapper.vm.sendEditUserForm();
    expect(spyUpdateUser).toHaveBeenCalled();
    expect(spyMoveToPreviousPage).toHaveBeenCalled();
  });

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});
