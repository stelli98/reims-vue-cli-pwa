import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionForm from "@/components/TransactionForm.vue";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";
import Vue from "vue";

const url = config.api.transactions;

describe("TransactionForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const fuelData = data.find(
    d => d.url == url.transaction && d.method == "POST"
  );

  // const EventBus = new Vue();

  // const GlobalPlugins = {
  //   install(v) {
  //     // Event bus
  //     v.prototype.bus = EventBus;
  //   },
  // };

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
    // lv.use(GlobalPlugins);
    return lv;
  }

  function createWrapper(store, options) {
     const defaultConfig = {
        store,
        localVue,
        stub: ["FuelForm", "ParkingForm"],
        sync: false
     }
     const mergeConfig = {...options,...defaultConfig}
    return shallowMount(TransactionForm, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("computed isSwitchOn", () => {
    expect(wrapper.vm.isSwitchOn).toEqual(false);
  });

  test("toggle method", () => {
    const spy = jest.spyOn(store.actions, "setOCRResultType");
    wrapper.vm.toggle();
    expect(spy).toHaveBeenCalled();
  });

  test("moveTo method ", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options)
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo();
    expect(spy).toHaveBeenCalled();
  });

  test("checkContainsImage method",() =>{
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    store.state.image = ""
    wrapper = createWrapper(store.store,options);
    const spy = jest.spyOn(wrapper.vm, "moveTo");
    wrapper.vm.checkContainsImage();
    expect(spy).toHaveBeenCalled();
  })

  // test("Emit event bus submitForm method", () => {
  //   const options = {
  //       data () {
  //         return {
  //           bus: GlobalPlugins
  //         }
  //       }
  //   }
  //   wrapper = createWrapper(store.store,options);
  //   // console.log(wrapper.vm.bus)
  //   // const spy = jest.spyOn(wrapper.vm.bus.$emit,"submitFuelForm")
  //   wrapper.vm.submitForm();
  //   // expect(spy).toHaveBeenCalled();
  //   expect(wrapper.vm.bus.emitted().submitFuelForm).toEqual([[]])
  // });
});
