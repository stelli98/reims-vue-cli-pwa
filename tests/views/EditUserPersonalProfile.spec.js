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
      stubs: ["Datetime"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(EditUserPersonalProfile, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("moveTo method", () => {
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
    wrapper = createWrapper(store.store, options);

    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo("user");
    expect(spy).toHaveBeenCalled();
  });

  test("sendEditUserForm method if user data isn't filled", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          params: {
            id: "1559058600"
          }
        },
      },
      computed: {
        user() {
          return {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyUpdateUser = jest.spyOn(store.actions, "updateUser");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.sendEditUserForm();
    expect(spyUpdateUser).not.toHaveBeenCalled();
    expect(spyMoveTo).not.toHaveBeenCalled();
  });

  test("sendEditUserForm method if user data is filled", () => {
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
    wrapper = createWrapper(store.store, options);
    wrapper.vm.user = {
      username: "Stelli",
      role: "USER",
      dateOfBirth: "2000-08-25T03:00:00.000Z",
      gender: "FEMALE",
      division: "TECHNOLOGY"
    };
    const spyUpdateUser = jest.spyOn(store.actions, "updateUser");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.sendEditUserForm();
    expect(spyUpdateUser).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalled();
  });

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});
