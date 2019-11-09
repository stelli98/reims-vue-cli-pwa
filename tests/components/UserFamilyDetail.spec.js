import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserFamilyDetail from "@/components/UserFamilyDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

let url = config.api.users;
describe("UserFamilyDetail.vue", async () => {
  let store;
  let localVue;
  let wrapper;
  const UserFamilydata = data.find(
    d => d.url == url.family + "?user-id=1559058600" && d.method == "GET"
  );

  function initializeStore() {
    const state = {
      userFamilies: UserFamilydata.data
    };
    const actions = {
      getUserFamilyDetailByUserId: jest.fn(),
      deleteUserFamily: jest.fn()
    };
    const getters = {
      userFamilies: state => state.userFamilies
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
      state,
      getters,
      actions
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(UserFamilyDetail, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("Get userId from url param", () => {
    const params = {
      id: "1559058600"
    };
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          params
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.$router.push({ params });
    expect(wrapper.vm.userId).toBe(wrapper.vm.$route.params.id);
  });

  test("isExpandedGroup method is included in expanded index", () => {
    wrapper.vm.expandedGroup = [2];
    expect(wrapper.vm.isExpandedGroup(3)).toEqual(false);
  });

  test("isExpandedGroup method isn't included in expanded index", () => {
    wrapper.vm.expandedGroup = [2];
    expect(wrapper.vm.isExpandedGroup(2)).toEqual(true);
  });

  test("toggleExpandFamilyData method if data is already expanded", () => {
    wrapper.vm.expandedGroup = [2, 3];
    wrapper.vm.toggleExpandFamilyData(2);
    expect(wrapper.vm.expandedGroup.indexOf(2)).toEqual(-1);
  });

  test("toggleExpandFamilyData method if data haven't expand", () => {
    wrapper.vm.expandedGroup = [3];
    wrapper.vm.toggleExpandFamilyData(2);
    expect(wrapper.vm.expandedGroup.indexOf(2)).toEqual(1);
  });

  test("moveTo method", () => {
    const params = {
      id: "1559058600"
    };
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          params
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo("edit-family-profile");
    expect(spy).toHaveBeenCalled();
  });

  test("removeUserFamily method", ()=>{
    const params = {
      id: "1559058600"
    };
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          params
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(store.actions, "deleteUserFamily")
    wrapper.vm.removeUserFamily(params.id);
    expect(spy).toHaveBeenCalled();
  })
});
