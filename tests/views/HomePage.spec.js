import { shallowMount, createLocalVue } from "@vue/test-utils";
import HomePage from "@/views/HomePage";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
const routes = [
  {
    path: "/login",
    name: "login"
  },
  {
    path: "/transactions/create/:step",
    name: "create"
  },
  {
    path: "/transactions/edit-profile",
    name: "edit-profile"
  },
  {
    path: "/home",
    name: "home"
  }
];

describe("HomePage.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const transactionData = data.find(
    d => d.url == url.transaction && d.method == "GET" && d.params.page == 1
  );

  function initializeStore () {
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

  function initializeAuthStore () {
    const actions = {
      logout: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeUserStore () {
    const actions = {
      downloadPersonalReport: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeTransactionStore () {
    const actions = {
      setImage: jest.fn(),
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

  function generateLocalVue () {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper (store) {
    const router = new VueRouter({ routes });
    return shallowMount(HomePage, {
      store,
      localVue,
      router,
      stubs: ["TransactionList", "Pagination", "SortFilter"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("method toogleFilter", () => {
    wrapper.vm.toogleFilter(true);
    expect(wrapper.vm.showFilter).toBe(true);
  });

  test("methods changePage", () => {
    wrapper.vm.changePage(2);
    expect(wrapper.vm.$route.query.page).toBe(2);
  });

  test("method moveTo", async () => {
    wrapper.vm.moveTo("edit-profile");
    expect(wrapper.vm.$route.path).toEqual("/transactions/edit-profile");
  });

  test("methods doLogout", () => {
    const spy = jest.spyOn(store.actions.auth, "logout");
    wrapper.vm.doLogout();
    expect(spy).toHaveBeenCalled();
  });

  test("methods onFileChange", () => {
    global.URL.createObjectURL = jest.fn();
    const spy = jest.spyOn(store.actions.transaction, "setImage");
    const e = {
      target: {
        files: ["image.jpg"]
      }
    };
    wrapper.vm.onFileChange(e);
    expect(spy).toHaveBeenCalled();
  });

  test("methods updateTransaction if there is no transactions", async () => {
    const spyAction = jest.spyOn(store.actions.transaction, "getTransactions");
    store.state.transaction.transactions = []
    const spyChangePage = jest.spyOn(wrapper.vm, "changePage")
    await wrapper.vm.updateTransaction();
    expect(spyAction).toHaveBeenCalled();
    wrapper.vm.$nextTick(() => {
      expect(spyChangePage).toHaveBeenCalled();
      expect(wrapper.vm.$route.query.page).toBe(1);
    })
  })

  test("methods download", () => {
    const spy = jest.spyOn(store.actions.user, "downloadPersonalReport");
    wrapper.vm.download();
    expect(spy).toHaveBeenCalled();
  });

});
