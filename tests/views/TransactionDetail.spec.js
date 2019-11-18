import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionDetail from "@/views/TransactionDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

const routes = [
  {
    path: "/transaction/:id",
    name: "transaction-detail"
  },
  {
    path: "/home",
    name: "home"
  }
];

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
      getTransaction: jest.fn(),
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
    lv.use(VueRouter);
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes });
    return shallowMount(TransactionDetail, {
      store,
      localVue,
      router,
      stubs: ["ViewParkingDetail", "ViewFuelDetail","GlobalHeader"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("route push to transaction with transactionId", () => {
    var transactionID = {
      id: 1
    };
    wrapper.vm.$router.push({ transactionID });
    expect(wrapper.vm.transactionId).toBe(
      wrapper.vm.$route.params.transactionID
    );
  });

  test("transactionCategory must be PARKING", () => {
    var transactionID = {
      id: 1
    };
    wrapper.vm.$router.push({ transactionID });
    expect(wrapper.vm.transactionCategory).toBe("Parking");
  });

  test("activeComponent must be ViewParkingDetail", () => {
    var transactionID = {
      id: 1
    };
    wrapper.vm.$router.push({ transactionID });
    expect(wrapper.vm.activeComponent).toBe("ViewParkingDetail");
  });
});
