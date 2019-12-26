import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionDetail from "@/views/TransactionDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

describe("TransactionDetail.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const transactionData = data.find(d => d.url === url.transaction + "/1");
  const imageData = data.find(
    d => d.url === url.transaction + "/3278/12345abc"
  );

  function initializeStore() {
    const actions = {
      getTransactionByCategory: jest.fn(),
      getViewImage: jest.fn()
    };

    const getters = {
      transaction: state => state.transaction,
      viewImage: state => state.viewImage
    };

    const state = {
      transaction: transactionData.data,
      viewImage: imageData.data
    };

    const store = new Vuex.Store({
      modules: {
        transaction: {
          actions,
          state,
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
    lv.use(Vuex);
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stubs: ["ViewParkingDetail", "ViewFuelDetail", "GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(TransactionDetail, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("get transactionID", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "fuel"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(store.actions, "getTransactionByCategory");
    expect(spy).toHaveBeenCalled();
  });

  test("transactionCategory must be PARKING", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "PARKING"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.transactionCategory).toBe("Parking");
  });

  test("activeComponent must be ViewParkingDetail", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "PARKING"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeComponent).toBe("ViewParkingDetail");
  });

  test("activeComponent must be empty string", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: ""
          },
          params: {
            id: 1
          }
        }
      },
      computed: {
        transactionCategory() {
          return null;
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeComponent).toBe("");
  });

  test("imageExt must be png", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: ""
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.imageExt).toBe("png");
  });

  test("imageExt must be empty string", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: ""
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    store.state.transaction.image=""
    expect(wrapper.vm.imageExt).toBe("");
  });
});
