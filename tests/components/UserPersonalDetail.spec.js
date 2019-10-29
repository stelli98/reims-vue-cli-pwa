import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserPersonalDetail from "@/components/UserPersonalDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("UserPersonalDetail.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === url.user + "/1559058600" && d.method == "GET"
  );

  function initializeStore() {
    const actions = {
      getUser: jest.fn()
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
          actions,
          getters, 
          state, 
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
    lv.filter("dateFormatter", dateFilter);
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(UserPersonalDetail, mergeConfig);
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
          params :{
            id : "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo("user");
    expect(spy).toHaveBeenCalled();
  });

});
