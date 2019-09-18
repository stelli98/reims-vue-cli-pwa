import { shallowMount, createLocalVue } from "@vue/test-utils";
import FilterImage from "@/components/FilterImage";
import Vuex from "vuex";
import VueRouter from "vue-router";
const routes = [
  {
    path: "/transactions/create/1",
    name: "create-transaction-1"
  },
  {
    path: "/transactions/create/3",
    name: "create-transaction-3"
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
      state:{
        transaction: transaction.state
      },
      getters:{
        transaction: transaction.getters
      },
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
    const state = {
      image: 'image.jpg'
    }
    const getters = {
      image: state => state.image
    }
    const actions = {
      createTransaction: jest.fn(),
      setOCRResultType: jest.fn()
    };
    const namespaced = true;
    return { state,getters, actions, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper(store) {
    const router = new VueRouter({ routes });
    return shallowMount(FilterImage, {
      store,
      localVue,
      router,
      sync: false,
      attachToDocument: true
    });
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

  test("uploadImageOCR method if app is online", async () => {
    wrapper = createWrapper(store.store);
    const resultImage = "data:image/png.AAAA";
    const spyCreateTransaction = jest.spyOn(
      store.actions.transaction,
      "createTransaction"
    );
    const spySuccessNotification = jest.spyOn(
      store.actions.notification,
      "addNotification"
    );
    await wrapper.vm.uploadImageOCR(resultImage);
    wrapper.vm.$nextTick(() => {
      expect(spyCreateTransaction).toHaveBeenCalled();
      expect(spySuccessNotification).toHaveBeenCalled();
    });
  });

  test("uploadImageOCR method if app is offline", async () => {
    store.actions.transaction.createTransaction.mockRejectedValue(() =>
      Promise.reject()
    );
    wrapper = createWrapper(store.store);
    const resultImage = "data:image/png.AAAA";
    const spyCreateTransaction = jest.spyOn(
      store.actions.transaction,
      "createTransaction"
    );
    const spyErrorNotification = jest.spyOn(
      store.actions.notification,
      "addNotification"
    );
    try {
      await wrapper.vm.uploadImageOCR(resultImage);
    } catch {
      wrapper.vm.$nextTick(() => {
        expect(spyCreateTransaction).toHaveBeenCalled();
        expect(spyErrorNotification).toHaveBeenCalled();
      });
    }
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
