import { shallowMount, createLocalVue } from "@vue/test-utils";
import AddFamily from "@/views/AddFamily";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

const childrenData = {
  name: "",
  relationship: "CHILDREN",
  dateOfBirth: ""
};
const spouseData = {
  name: "",
  relationship: "SPOUSE",
  dateOfBirth: ""
};

describe("FuelForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userData = data.find(
    d => d.url === `${url.user}/1559058600/family-members` && d.method == "GET"
  );

  function initializeStore() {
    const state = {
      userFamily: userData.data
    };
    const actions = {
      getUserFamilyDetail: jest.fn(),
      addFamilyToUser: jest.fn()
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
      state,
      getters,
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
    return shallowMount(AddFamily, mergeConfig);
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
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo("user");
    expect(spy).toHaveBeenCalled();
  });

  test("checkUserFamilyData if spouseDataisAvailable is true", () => {
    const options = {
      computed: {
        isSpouseDataAvailable() {
          return userData.data[0];
        }
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.checkUserFamilyData();
    expect(wrapper.vm.family[length]).toEqual(childrenData);
  });

  test("checkUserFamilyData if spouseDataisAvailable is false", () => {
    const options = {
      computed: {
        isSpouseDataAvailable() {
          return undefined;
        }
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.checkUserFamilyData();
    expect(wrapper.vm.family[0]).toEqual(spouseData);
  });

  test("addFamilyField if maxFamilyField is more than 3", () => {
    const options = {
      computed: {
        maxFamilyField() {
          return 3;
        }
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.addFamilyField();
    expect(wrapper.vm.family[length]).toEqual(childrenData);
  });

  test("addFamilyField if FamilyLength is equal to total family length", () => {
    const options = {
      computed: {
        maxFamilyField() {
          return 1;
        }
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.family.push(spouseData);
    wrapper.vm.addFamilyField();
    expect(wrapper.vm.family.length).toEqual(1);
  });

  test("removeFamilyField", () => {
    wrapper.vm.removeFamilyField(wrapper.vm.length - 1);
    expect(wrapper.vm.family.length).toEqual(1);
  });

  test("submitAddFamilyToUserForm if data is valid", () => {
    const options = {
      data() {
        return {
          family: [
            {
              name: "Hiromi",
              relationship: "SPOUSE",
              dateOfBirth: "2019-08-10T06:40:59.000Z"
            }
          ]
        };
      },
      mocks: {
        $route: {
          params: {
            id: "1559058600"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, "convertDateToEpoch");
    const spyAddFamilyToUser = jest.spyOn(store.actions, "addFamilyToUser");
    wrapper.vm.submitAddFamilyToUserForm();
    expect(spyConvertDateToEpoch).toHaveBeenCalled();
    expect(spyAddFamilyToUser).toHaveBeenCalled();
  });
});
