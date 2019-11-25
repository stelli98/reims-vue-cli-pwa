import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateTransaction from "@/views/CreateTransaction.vue";
import Vuex from "vuex";

describe("CreateTransaction.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const actions = {
      setImage: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        transaction: {
          actions,
          namespaced: true
        }
      }
    });

    return {
      store,
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
      stubs: ["router-view","GlobalHeader"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(CreateTransaction, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("activeSecondProgressBar if router doesn't consist of create-transaction-2", () => {
    const options = {
      mocks: {
        $route: {
          name: ""
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeSecondProgressBar).toBe("");
  });

  test("activeSecondProgressBar if router consist create-transaction-2", () => {
    const options = {
      mocks: {
        $route: {
          name: "create-transaction-2"
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeSecondProgressBar).toBe("progress-bar-active");
  });

  test("activeThirdProgressBar if router doesn't consist of create-transaction-3", () => {
    const options = {
      mocks: {
        $route: {
          name: ""
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeThirdProgressBar).toBe("");
  });

  test("activeThirdProgressBar if router consist create-transaction-3", () => {
    const options = {
      mocks: {
        $route: {
          name: "create-transaction-3"
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.activeThirdProgressBar).toBe("progress-bar-active");
  });

  test("moveTo method", ()=>{
    const options = {
        mocks: {
          $router: {
            push : jest.fn()
          },
          $route: {
            name: "create-transaction-3"
          }
        }
      };
      wrapper = createWrapper(store.store, options);
      const spyRouter = jest.spyOn(wrapper.vm.$router, 'push')
      const spyDeleteDataFromIDB = jest.spyOn(wrapper.vm, 'deleteDataFromIDB')
      wrapper.vm.moveTo()
      expect(spyDeleteDataFromIDB).toHaveBeenCalled();
      expect(spyRouter).toHaveBeenCalled();
  })
});
