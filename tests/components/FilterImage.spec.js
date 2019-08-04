import { shallowMount, createLocalVue } from "@vue/test-utils";
import FilterImage from "@/components/FilterImage";
import Vuex from "vuex";
import VueRouter from "vue-router";
const routes = [
  {
    path: "/transactions/create/:step",
    name: "create"
  }
];

describe("FilterImage.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const notification = initializeNotificationStore();
    const store = new Vuex.Store({
      modules: {
        transaction,
        notification
      }
    });

    return {
      store,
      actions: {
        transaction: transaction.actions,
        notification: notification.actions
      }
    };
  }

  function initializeNotificationStore() {
    const actions = {
      addNotification: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeTransactionStore() {
    const actions = {
      createTransaction: jest.fn(() => Promise.reject(new Error("Offline")))
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper(store, options) {
    const router = new VueRouter({ routes });
    const defaultOptions = {
      store,
      localVue,
      router,
      sync: false,
      attachToDocument: true
    };
    const mergeOptions = { ...options, ...defaultOptions };
    return shallowMount(FilterImage, mergeOptions);
  }

  beforeEach(() => {
    const createElement = document.createElement.bind(document);
    0;
    document.createElement = tagName => {
      if (tagName === "canvas") {
        return {
          getContext: jest.fn(() => {
            return {
              drawImage: () => ({})
            };
          }),
          toDataURL: jest.fn(() => {
            return "data:image/png;base64, iVBORw0";
          })
        };
      }
      return createElement(tagName);
    };
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("if there's no pictureUrl props", () => {
    const options = {
      propsData: {
        pictureUrl: ""
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.$route.name).toBe("create");
    expect(wrapper.vm.$route.params.step).toBe(1);
  });

  test("if there's pictureUrl props", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    const expectedValue = {
      grayscale: 1,
      brightness: 1.1,
      contrast: 1
    };
    expect(wrapper.vm.filterFunctions).toEqual(expectedValue);
  });

  test("uploadImageOCR method online", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    const resultImage = "data:image/png.AAAA";
    const spyCreateTransaction = jest.spyOn(
      store.actions.transaction,
      "createTransaction"
    );
    // const spySuccessNotification = jest.spyOn(store.actions.notification, 'addNotification')
    wrapper.vm.uploadImageOCR(resultImage);
    expect(spyCreateTransaction).toHaveBeenCalled();
    // expect(spySuccessNotification).toHaveBeenCalled()
  });

  test("generateImage method ", () => {
    wrapper.vm.generateImage();
    const spy = jest.spyOn(wrapper.vm, "uploadImageOCR");
    expect(wrapper.vm.generateImage()).toEqual(
      "data:image/png;base64, iVBORw0"
    );
    expect(spy).toHaveBeenCalled();
  });

  test("makeFilter method", () => {
    wrapper.vm.filterFunctions = {
      grayscale: 0.8,
      brightness: 2.0,
      contrast: 1.55
    };
    const expectedValue = {
      filter: "grayscale(0.8) brightness(2) contrast(1.55) "
    };
    wrapper.vm.makeFilter();
    expect(wrapper.vm.makeFilter()).toEqual(expectedValue);
  });
});
