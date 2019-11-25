import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionForm from "@/components/TransactionForm.vue";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
const TOGGLE_BUTTON = {
  true: {
    component: "PARKING",
    action: "submitParkingForm",
    show: true
  },
  false: {
    component: "FUEL",
    action: "submitFuelForm",
    show: false
  }
};

describe("TransactionForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const fuelData = data.find(
    d => d.url == url.transaction && d.method == "POST"
  );

  function initializeStore() {
    const state = {
      OCRResultType: fuelData.data.category,
      image: fuelData.data.image
    };
    const actions = {
      setFormEmpty: jest.fn(),
      setOCRResultType: jest.fn()
    };
    const getters = {
      image: state => state.image,
      OCRResultType: state => state.OCRResultType
    };
    const store = new Vuex.Store({
      modules: {
        transaction: {
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
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stub: ["FuelForm", "ParkingForm"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(TransactionForm, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("TransactionForm created", async () => {
    const obj = {
      checkContainsType: jest.fn(),
      checkContainsImage: jest.fn()
    };
    const created = TransactionForm.created.bind(obj);
    created();
    expect(obj.checkContainsType).toHaveBeenCalled();
    expect(obj.checkContainsImage).toHaveBeenCalled();
  });

  test("computed isSwitchOn", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.isSwitchOn).toEqual(false);
  });

  test("computed isSwitchOn for undefined currentComponent", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      },
      computed: {
        currentComponent(){
          return undefined
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.isSwitchOn).not.toEqual(false);
  });

  test("checkContainsImage method", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    store.state.image = "";
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsImage();
    expect(spy).toHaveBeenCalled();
  });

  test("checkContainsImage method", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    store.state.image = "";
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsImage();
    expect(spy).toHaveBeenCalled();
  });

  test("checkContainsType method if params type is found", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsType();
    expect(spy).not.toHaveBeenCalled();
  });

  test("checkContainsType method if params type is not found", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: ""
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsType();
    expect(spy).toHaveBeenCalled();
  });

  test("Emit event bus submitForm method", () => {
    const options = {
      mocks: {
        bus: {
          $emit: jest.fn()
        },
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      },
      computed: {
        isSwitchOn() {
          return false;
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.bus, "$emit");
    wrapper.vm.submitForm();
    expect(spy).toHaveBeenCalledWith(TOGGLE_BUTTON[false.toString()].action);
  });
});
