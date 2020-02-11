import { shallowMount, createLocalVue } from "@vue/test-utils";
import LoginPage from "@/views/common/LoginPage";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.auth;

const routes = [
  {
    path: "/users",
    name: "user"
  },
  {
    path: "/home",
    name: "home"
  }
];

describe("LoginPage.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(d => d.url === url.login && d.method == "POST");

  function initializeUserStore() {
    const actions = {
      getVehicleData: jest.fn(),
      getUserFamily: jest.fn()
    };

    return {
      actions,
      namespaced: true
    };
  }

  function initializeAuthStore() {
    const actions = {
      login: jest.fn().mockResolvedValue(Promise.resolve("success"))
    };

    const state = {
      role: userData.data.role
    };

    const getters = {
      role: state => state.role
    };

    return {
      state,
      actions,
      getters,
      namespaced: true
    };
  }

  function initializeStore() {
    const auth = initializeAuthStore();
    const user = initializeUserStore();
    const store = new Vuex.Store({
      modules: {
        auth,
        user,
        namespaced: true
      }
    });

    return {
      store,
      state: {
        auth: auth.state
      },
      actions: {
        auth: auth.actions,
        user: user.actions
      },
      getters: {
        auth: auth.state
      }
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(VueRouter);
    lv.use(Vuelidate);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes });
    return shallowMount(LoginPage, {
      store,
      localVue,
      router,
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("submitLoginForm should call the login action and change the route", () => {
    wrapper.vm.user = {
      username: "Hefriza Munaf",
      password: "1234567"
    };
    const spyActionsLogin = jest.spyOn(store.actions.auth, "login");
    wrapper.vm.submitLoginForm();
    expect(spyActionsLogin).toHaveBeenCalled();
  });

  test("getUserData method", () => {
    store.state.auth.role = "USER";
    const spyGetVehicleData = jest.spyOn(store.actions.user, "getVehicleData");
    const spyGetUserFamily = jest.spyOn(store.actions.user, "getUserFamily");
    wrapper.vm.getUserData();
    expect(spyGetVehicleData).toHaveBeenCalled();
    expect(spyGetUserFamily).toHaveBeenCalled();
  });
});
