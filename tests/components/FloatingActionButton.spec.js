import { shallowMount, createLocalVue } from "@vue/test-utils";
import FloatingActionButton from "@/components/FloatingActionButton";
import Vuex from "vuex";

describe("FloatingActionButton.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const actions = {
      setImage: jest.fn(),
      setImages: jest.fn()
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
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(FloatingActionButton, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("methods onOCRFileChange", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    global.URL.createObjectURL = jest.fn();
    const spySetImage = jest.spyOn(store.actions, "setImage");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const e = {
      target: {
        files: ["image.jpg"]
      }
    };
    wrapper.vm.onOCRFileChange(e);
    expect(spySetImage).toHaveBeenCalled();
    expect(spyRoute).toHaveBeenCalled();
  });

  test("methods onNonOCRFileChange", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    global.URL.createObjectURL = jest.fn();
    const spySetImages = jest.spyOn(store.actions, "setImages");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const e = {
      target: {
        files: ["image1.jpg", "image2.jpg"]
      }
    };
    wrapper.vm.onNonOCRFileChange(e);
    expect(spySetImages).toHaveBeenCalled();
    expect(spyRoute).toHaveBeenCalled();
  });

  test("toggleDisplayMenu before it's clicked", () => {
    expect(wrapper.vm.displayMenu).toEqual(false);
  });

  test("toggleDisplayMenu after it's clicked", () => {
    wrapper.vm.toggleDisplayMenu();
    expect(wrapper.vm.displayMenu).toEqual(true);
  });
});
