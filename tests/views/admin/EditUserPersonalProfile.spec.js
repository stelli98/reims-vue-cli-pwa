import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditUserPersonalProfile from "@/views/admin/EditUserPersonalProfile.vue";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;

describe("EditUserPersonalProfile.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === url.family + "?user-id=1559058600" && d.method == "GET"
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
        admin: {
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
      stubs: ["Datetime", "GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(EditUserPersonalProfile, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("checkUserHaveVehicle method if user doesn't have vehicle", async () => {
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
    await wrapper.vm.checkUserHaveVehicle();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.userHaveVehicle).toBe("no");
    });
  });

  test("checkUserHaveVehicle method if user have vehicle", () => {
    const expectedValue = {
      license: "BL 123 AA",
      vehicle: "Avanza"
    };
    const options = {
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    store.state.user = expectedValue;
    wrapper = createWrapper(store.store, options);
    wrapper.vm.checkUserHaveVehicle();
    expect(wrapper.vm.user.license).toBe(expectedValue.license);
    expect(wrapper.vm.user.vehicle).toBe(expectedValue.vehicle);
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

  test("sendEditUserForm method if user data is filled", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
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
    const spyMoveToWithParams = jest.spyOn(wrapper.vm.$router, "push");
    await wrapper.vm.sendEditUserForm();
    expect(spyUpdateUser).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(spyMoveToWithParams).toHaveBeenCalled();
    });
  });

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});
