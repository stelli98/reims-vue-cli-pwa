import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserCard from "@/components/UserCard";
import trimTextFilter from "@/filters/trimText";
import dateFilter from "@/filters/date";
import priceFilter from "@/filters/price";
import textFilter from "@/filters/text";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

const routes = [
  {
    path: "/users/edit/:id",
    name: "user-edit"
  },
  {
    path: "/users",
    name: "user",
  }
];

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
    lv.use(VueRouter);
    lv.filter("dateFormatter", dateFilter);
    lv.filter("priceFormatter", priceFilter);
    lv.filter("trimTextFormatter", trimTextFilter);
    lv.filter("textFormatter", textFilter);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes });
    return shallowMount(UserCard, {
      store,
      router,
      localVue,
      propsData: {
        user: userData.data[1]
      }
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("Username must be shorten from Munawan Sadakh to Munawan Sa...", () => {
    expect(wrapper.vm.userName).toBe("Munawan Sa...");
  });

  test("Should be calling deleteUser actions", () => {
    const spy = jest.spyOn(store.actions, "deleteUser");
    const userId = 1;
    wrapper.vm.removeUser(userId);
    expect(spy).toHaveBeenCalled();
  });

  test("Should be move to user detail page", () => {
    const userId = 1;
    wrapper.vm.moveTo(userId);
    expect(wrapper.vm.$route.path).toBe("/users/edit/1");
  });
});
