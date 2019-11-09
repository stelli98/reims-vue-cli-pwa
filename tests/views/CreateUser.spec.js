import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateUser from "@/views/CreateUser";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";

describe("FuelForm.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const actions = {
      createUser: jest.fn()
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
    return shallowMount(CreateUser, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("moveTo method", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo("user");
    expect(spy).toHaveBeenCalled();
  });

  test("sendCreateUserForm method if user data is filled", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyCreateUser = jest.spyOn(store.actions, "createUser");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.sendCreateUserForm();
    expect(spyCreateUser).not.toHaveBeenCalled();
    expect(spyMoveTo).not.toHaveBeenCalled();
  });

  test("sendCreateUserForm method if user data is filled", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.user = {
      username: "Stelli",
      password: "1234567",
      role: "USER",
      dateOfBirth: "2000-08-25T03:00:00.000Z",
      gender: "FEMALE",
      division: "TECHNOLOGY"
    };
    const spyCreateUser = jest.spyOn(store.actions, "createUser");
    const spyMoveTo = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.sendCreateUserForm();
    expect(spyCreateUser).toHaveBeenCalled();
    expect(spyMoveTo).toHaveBeenCalled();
  });

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });
});