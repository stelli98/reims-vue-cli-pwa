import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App";
// import transactionApi from "@/api/transaction";
// import offlineService from "@/api/transaction-offline";

describe("SyncTransactions Lib", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const notification = initializeNotificationStore();
    const auth = initializeAuthStore();
    const store = new Vuex.Store({
      modules: {
        transaction,
        notification,
        auth
      }
    });

    return {
      store,
      state: {
        auth: auth.state
      },
      actions: {
        transaction: transaction.actions,
        notification: notification.actions
      },
      getters: {
        auth: auth.getters
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
      createTransaction: jest.fn(),
      getTransactions: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function initializeAuthStore() {
    const state = {
      token: "Bearer 123",
      id: 123
    };
    const getters = {
      token: state => state.token,
      id: state => state.id
    };
    const namespaced = true;
    return { state, getters, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store) {
    return shallowMount(App, {
      store,
      localVue,
      stubs: ["NotificationContainer", "router-view"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("setSendingData", () => {
    wrapper.vm.setSendingData(true);
    expect(wrapper.vm.isSending).toBe(true);
  });

  test("checkImagesByUserId methods", () => {
    const images = [
      {
        userId: 123,
        image: "image-1.jpg",
        id: 1
      },
      {
        userId: 321,
        image: "image-2.jpg",
        id: 2
      }
    ];
    expect(wrapper.vm.checkImagesByUserId(images)).toEqual(images[0]);
  });

  test("checkFormsByUserId methods", () => {
    const forms = [
      {
        userId: 123,
        category: "FUEL",
        id: 1
      },
      {
        userId: 321,
        category: "PARKING",
        id: 2
      }
    ];
    expect(wrapper.vm.checkFormsByUserId(forms)).toEqual(forms[0]);
  });

  test("sendImageObject method", () => {
    const data = {
      id: 1,
      userId: 123,
      image: "image.jpg"
    };
    const expectedValue = {
      image: "image.jpg"
    };
    expect(wrapper.vm.sendImageObject(data)).toEqual(expectedValue);
  });

  test("addSuccessFormNotification method", () => {
    const spy = jest.spyOn(store.actions.notification, "addNotification");
    wrapper.vm.addSuccessFormNotification();
    expect(spy).toHaveBeenCalled();
  });

  test("addSuccessImageNotification method", () => {
    const spy = jest.spyOn(store.actions.notification, "addNotification");
    wrapper.vm.addSuccessImageNotification();
    expect(spy).toHaveBeenCalled();
  });
});
