import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserForm from "@/views/UserForm";
import TextFilter from "@/filters/text";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;
const routes = [
  {
    path: "/users",
    name: "user"
  },
  {
    path: "/users/create",
    name: "user-create"
  },
  {
    path: "/users/edit/:id",
    name: "user-edit"
  }
];

describe("UserForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url == url.user + "/1559058600" && d.method == "GET"
  );

  function initializeStore() {
    const state = {
      user: userData.data
    };
    const actions = {
      updateUser: jest.fn(),
      createUser: jest.fn(),
      getUser: jest.fn(),
      emptyUser: jest.fn()
    };

    const getters = {
      user: state => state.user
    };

    const store = new Vuex.Store({
      modules: {
        user: {
          state,
          actions,
          getters,
          namespaced: true
        }
      }
    });

    return {
      store,
      state,
      actions,
      getters
    };
  }
  function generateLocalVue() {
    const lv = createLocalVue();
    lv.filter("textFormatter", TextFilter);
    lv.use(Vuex);
    lv.use(VueRouter);
    lv.use(Vuelidate);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes });
    return shallowMount(UserForm, {
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

  test("method moveTo", () => {
    wrapper.vm.moveTo();
    expect(wrapper.vm.$route.path).toBe("/users");
  });

  test("formTitle must be Create User", () => {
    expect(wrapper.vm.formTitle).toBe("Create User");
  });

  test("method checkActionForm be called emptyUser action", () => {
    const spy = jest.spyOn(store.actions, "emptyUser");
    wrapper.vm.checkActionForm();
    expect(spy).toHaveBeenCalled();
  });

  test("method sendForm be called createUser action", () => {
    const spy = jest.spyOn(store.actions, "createUser");
    wrapper.vm.sendForm();
    expect(spy).toHaveBeenCalled();
  });

  test("method submitForm succed", () => {
    const spy = jest.spyOn(wrapper.vm, "sendForm");
    wrapper.vm.submitForm();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toEqual("/users");
  });

  test("formTitle must be Edit User", () => {
    wrapper.vm.$router.push("users/edit/1559058600");
    wrapper.vm.$router.push({ params: { id: "/1559058600" } });
    expect(wrapper.vm.formTitle).toBe("Edit User");
  });

  test("method checkActionForm be called getUser action", () => {
    const spy = jest.spyOn(store.actions, "getUser");
    wrapper.vm.checkActionForm();
    expect(spy).toHaveBeenCalled();
  });

  test("method sendForm be called updateUser action", () => {
    const spy = jest.spyOn(store.actions, "updateUser");
    wrapper.vm.sendForm();
    expect(spy).toHaveBeenCalled();
  });
});
