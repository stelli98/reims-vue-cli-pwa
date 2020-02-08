import { shallowMount, createLocalVue } from "@vue/test-utils";
import ChangePasswordPage from "@/views/user/ChangePasswordPage";
import Vuex from "vuex";
import Vuelidate from "vuelidate";

describe("FuelForm.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const actions = {
      changePassword: jest.fn()
    };
    const store = new Vuex.Store({
      modules: {
        user: {
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
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stubs: ["GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(ChangePasswordPage, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("submitChangePasswordForm method if user data isn't filled", () => {
    const spyChangePassword = jest.spyOn(store.actions, "changePassword");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.submitChangePasswordForm();
    expect(spyChangePassword).not.toHaveBeenCalled();
    expect(spyMoveTo).not.toHaveBeenCalled();
  });

  test("submitChangePasswordForm method if password and changePassword isn't samed", () => {
    wrapper.vm.user = {
      password: "stelli123",
      confirmPassword: "stellitan123"
    };
    const spyChangePassword = jest.spyOn(store.actions, "changePassword");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.submitChangePasswordForm();
    expect(spyChangePassword).not.toHaveBeenCalled();
    expect(spyMoveTo).not.toHaveBeenCalled();
  });

  test("submitChangePasswordForm method if user data is filled", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          params: { 
            id: "1559058600" 
          },
          query: {
            role: "user"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.user = {
      password: "stelli123",
      confirmPassword: "stelli123"
    };
    const spyChangePassword = jest.spyOn(store.actions, "changePassword");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.submitChangePasswordForm();
    expect(spyChangePassword).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalled();
  });
});
