import { shallowMount, createLocalVue } from "@vue/test-utils";
import HomePage from "@/views/HomePage";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

describe("HomePage.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const transactionData = data.find(
    d => d.url == url.transaction && d.method == "GET" && d.params.page == 1
  );

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const auth = initializeAuthStore();
    const user = initializeUserStore();
    const store = new Vuex.Store({
      modules: {
        transaction,
        auth,
        user
      }
    });

    return {
      store,
      state: {
        transaction: transaction.state
      },
      actions: {
        transaction: transaction.actions,
        auth: auth.actions,
        user: user.actions
      },
      getters: {
        transaction: transaction.getters
      }
    };
  }

  function initializeAuthStore() {
    const actions = {
      logout: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeUserStore() {
    const actions = {
      downloadPersonalReport: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeTransactionStore() {
    const actions = {
      getTransactions: jest.fn()
    };
    const state = {
      transactions: transactionData.data,
      pagination: transactionData.data.page
    };
    const getters = {
      transactions: state => state.transactions,
      pagination: state => state.pagination
    };
    const namespaced = true;
    return { state, actions, getters, namespaced };
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
      stubs: ["TransactionList", "Pagination", "SortFilter"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(HomePage, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("method toogleFilter", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {}
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.toogleFilter(true);
    expect(wrapper.vm.showFilter).toBe(true);
  });

  test("methods changePage", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            page: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.changePage(2);
    expect(spyRouterPush).toHaveBeenCalled();
  });

  test("methods doLogout", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            page: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(store.actions.auth, "logout");
    wrapper.vm.doLogout();
    expect(spy).toHaveBeenCalled();
  });

  test("methods updateTransaction if there is no transactions", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            page: 2
          }
        }
      },
      computed:{
        transactions(){
          return []
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyAction = jest.spyOn(store.actions.transaction, "getTransactions");
    store.state.transaction.transactions = [];
    const spyChangePage = jest.spyOn(wrapper.vm, "changePage");
    const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");
    await wrapper.vm.updateTransaction();
    expect(spyAction).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(spyChangePage).toHaveBeenCalled();
      expect(spyRouterPush).toHaveBeenCalled();
    });
  });

  test("methods download", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            page: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(store.actions.user, "downloadPersonalReport");
    wrapper.vm.download();
    expect(spy).toHaveBeenCalled();
  });

  test("methods toggleActionButton", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            page: 1
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    var expectedValue = true;
    wrapper.vm.toggleActionButton(expectedValue);
    expect(wrapper.vm.actionButtonActive).toBe(expectedValue);
  });
});
