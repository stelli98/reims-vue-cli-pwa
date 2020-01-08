import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserCard from "@/components/admin/UserCard";
import trimTextFilter from "@/filters/trimText";
import dateFilter from "@/filters/date";
import priceFilter from "@/filters/price";
import textFilter from "@/filters/text";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;

describe("UserCard.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(d => d.url === url.user);

  function initializeStore() {
    const actions = {
      deleteUser: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        admin: {
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
    lv.filter("dateFormatter", dateFilter);
    lv.filter("priceFormatter", priceFilter);
    lv.filter("trimTextFormatter", trimTextFilter);
    lv.filter("textFormatter", textFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      propsData: {
        user: userData.data[1]
      },
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(UserCard, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("Username must be shorten from Munawan Sadakh to Munawan Sa...", () => {
    expect(wrapper.vm.userName).toBe("Munawan Sa...");
  });

  test("Should be calling deleteUser actions", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActionDeleteUser = jest.spyOn(store.actions, "deleteUser");
    await wrapper.vm.removeUser(1);
    expect(spyActionDeleteUser).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted("deleteAnUser")).toBeTruthy();
    });
  });

  test("Should be moveToUserDetail",  () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveToUserDetail(1);
    expect(spy).toHaveBeenCalled();
  });
});
