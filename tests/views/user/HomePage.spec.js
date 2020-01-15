import { shallowMount, createLocalVue } from "@vue/test-utils";
import HomePage from "@/views/user/HomePage";
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
        auth: auth.actions,
        transaction: transaction.actions,
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
      getTransactionsByCategory: jest.fn()
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
    return { state, getters, actions, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store, options) {
    return shallowMount(HomePage, {
      ...options,
      store,
      localVue,
      stubs: ["TransactionList", "Pagination", "SortFilter"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("transactionOptions watch", async(done) => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "medical"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.updateTransaction = jest.fn();
    const spy = jest.spyOn(wrapper.vm, "updateTransaction");
    wrapper.vm.$router.push = jest.fn(function() {
      wrapper.vm.$route.query.page = 2;
    })
    wrapper.vm.$router.push();
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalled();
      done()
    })
  });

  test("method toogleFilter", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
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
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.changePage(2);
    expect(spyRouterPush).toHaveBeenCalled();
  });

  test("methods download", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
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
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    var expectedValue = true;
    wrapper.vm.toggleActionButton(expectedValue);
    expect(wrapper.vm.actionButtonActive).toBe(expectedValue);
  });

  test("updateTransaction method", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActions = jest.spyOn(
      store.actions.transaction,
      "getTransactionsByCategory"
    );
    wrapper.vm.updateTransaction();
    expect(spyActions).toHaveBeenCalled();
  });

  test("methods doLogout", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 1,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyActions = jest.spyOn(store.actions.auth, "logout");
    wrapper.vm.doLogout();
    expect(spyActions).toHaveBeenCalled();
  });

  test("methods updateTransaction", async(done) => {
    const options = {
      mocks: {
        $route: {
          query: {
            page: 2,
            size: 5,
            sortBy: "date",
            category: "fuel"
          }
        },
        $router: {
          push: jest.fn()
        }
      }
    };
    const transaction = { 
      state: store.state.transaction, 
      getters: {
        transactions: () => [],
        pagination: state => state.pagination
      }, 
      actions: store.actions.transaction, 
      namespaced: true
    };

    const modifiedStore = new Vuex.Store({
      modules: {
        transaction
      }
    });
    
    wrapper = createWrapper(modifiedStore, options);
    wrapper.vm.changePage = jest.fn()
    const spyActions = jest.spyOn(wrapper.vm, "changePage");
    await wrapper.vm.updateTransaction();
    wrapper.vm.$nextTick(() => {
      expect(spyActions).toHaveBeenCalled();
      done()
    })
  });
});
