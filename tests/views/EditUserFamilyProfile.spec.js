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

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});
