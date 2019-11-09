import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditUserFamilyProfile from "@/views/EditUserFamilyProfile";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("EditUserFamilyProfile.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === url.family + "/92768" && d.method == "GET"
  );

  function initializeStore() {
    const actions = {
      updateUserFamily: jest.fn(),
      getUserFamilyDetailByFamilyId: jest.fn()
    };
    const state = {
      userFamily: userData.data
    };
    const getters = {
      userFamily: state => state.userFamily
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
    return shallowMount(EditUserFamilyProfile, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("moveToPreviousPage method", () => {
    const options = {
      mocks: {
        $router: {
          go: jest.fn()
        },
        $route: {
          params: {
            id: "92768"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "go");
    wrapper.vm.moveToPreviousPage();
    expect(spy).toHaveBeenCalled();
  });

  test("convertToIsoString method", () => {
    const options = {
      mocks: {
        $route: {
          params: {
            id: "92768"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.userFamily.dateOfBirth = 898362000000;
    wrapper.vm.convertToIsoString();
    expect(wrapper.vm.userFamily.dateOfBirth).toEqual("1998-06-20T17:00:00.000Z")
  });
  
  test("submitEditUserFamilyForm method if user data isn't filled", () => {
    const options = {
      mocks: {
        $router: {
          go: jest.fn()
        },
        $route: {
          params: {
            id: "92768"
          }
        },
      },
      computed: {
        userFamily() {
          return {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyUpdateUser = jest.spyOn(store.actions, "updateUserFamily");
    wrapper.vm.submitEditUserFamilyForm();
    expect(spyUpdateUser).not.toHaveBeenCalled();
  });

  test("submitEditUserFamilyForm method if user data is filled", () => {
    const options = {
      mocks: {
        $router: {
          go: jest.fn()
        },
        $route: {
          params: {
            id: "92768"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyUpdateUser = jest.spyOn(store.actions, "updateUserFamily");
    wrapper.vm.submitEditUserFamilyForm();
    expect(spyUpdateUser).toHaveBeenCalled();
  });
});
