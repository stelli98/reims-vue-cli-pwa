import { shallowMount, createLocalVue } from "@vue/test-utils";
import AddFamily from "@/views/admin/AddFamily";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("AddFamily.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === `${url.family}?user-id=1559058600` && d.method == "GET"
  );

  function initializeStore() {
    const state = {
      userFamilies: userData.data
    };
    const actions = {
      getUserFamilyDetailByUserId: jest.fn(),
      addFamilyToUser: jest.fn()
    };
    const getters = {
      userFamilies: state => state.userFamilies
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
      stubs: ["Datetime","GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(AddFamily, mergeConfig);
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

  test("submitAddFamilyToUserForm if data is valid", () => {
    const options = {
      data() {
        return {
          family: {
            name: "Hiromi",
            relationship: "SPOUSE",
            dateOfBirth: "2019-08-10T06:40:59.000Z"
          }
        };
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyAddFamilyToUser = jest.spyOn(store.actions, "addFamilyToUser");
    const spyMoveTo = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.submitAddFamilyToUserForm();
    expect(spyAddFamilyToUser).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalled();
  });

  test("submitAddFamilyToUserForm if data isn't valid", () => {
    const options = {
      data() {
        return {
          family: {}
        };
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyAddFamilyToUser = jest.spyOn(store.actions, "addFamilyToUser");
    const spyMoveTo = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.submitAddFamilyToUserForm();
    expect(spyAddFamilyToUser).not.toHaveBeenCalled();
    expect(spyMoveTo).not.toHaveBeenCalled();
  });



  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});
