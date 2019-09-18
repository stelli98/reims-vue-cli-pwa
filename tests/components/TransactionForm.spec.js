import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionForm from "@/components/TransactionForm.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

const routes = [
  {
    path: "/transactions/create/1",
    name: "create-transaction-1"
  },
  {
    path: "/home",
    name: "home"
  }
];

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
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes }); 
    return shallowMount(TransactionForm, {
      store,
      localVue,
      router,
      stub: ["FuelForm", "ParkingForm"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("computed isSwitchOn", () => {
    wrapper = createWrapper(store.store);
    expect(wrapper.vm.isSwitchOn).toEqual(false);
  });

  test("toggle method", () => {
    wrapper = createWrapper(store.store);
    const spy = jest.spyOn(store.actions, "setOCRResultType");
    wrapper.vm.toggle();
    expect(spy).toHaveBeenCalled();
  });
});
