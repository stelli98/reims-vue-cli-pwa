import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionDetail from "@/views/user/TransactionDetail";
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
  const transactionData = data.find(d => d.url === url.medical + "/14");

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const user = initializeUserStore();

    const store = new Vuex.Store({
      modules: {
        user,
        transaction
      }
    });

    return {
      store,
      state: {
        transaction: transaction.state
      },
      actions: {
        transaction: transaction.actions,
        user: user.actions
      },
      getters: {
        transaction: transaction.getters
      }
    };
  }

  function initializeTransactionStore() {
    const actions = {
      getTransactionByCategory: jest.fn()
    };

    const getters = {
      transaction: state => state.transaction
    };

    const state = {
      transaction: transactionData.data
    };
    const namespaced = true;
    return { actions, state, getters, namespaced };
  }

  function initializeUserStore() {
    const actions = {
      getViewImage: jest.fn()
    };
    const namespaced = true;
    return {
      actions,
      namespaced
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    lv.filter("priceFormatter", dateFilter);
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

  test("get transactionID", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "medical"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = await createWrapper(store.store, options);
    const spyGetTransactionByCategory = jest.spyOn(
      store.actions.transaction,
      "getTransactionByCategory"
    );
    const spyGetImageList = jest.spyOn(wrapper.vm, "getImageList");
    expect(spyGetTransactionByCategory).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(spyGetImageList).toHaveBeenCalled();
    });
  });

  test("transactionCategory must be Medical", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "MEDICAL"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.transactionCategory).toBe("Medical");
  });

  test("activeComponent must be ViewMedicalDetail", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "MEDICAL"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeComponent).toBe("ViewMedicalDetail");
  });

  test("get Image List", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "medical"
          },
          params: {
            id: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const expectedResult = {
      data: {
        data: "image.jpg"
      }
    };
    wrapper.vm.getViewImage = jest.fn().mockResolvedValue(expectedResult);
    wrapper.vm.getImageList();
    expect(wrapper.vm.getViewImage).toHaveBeenCalled();
  });
});
