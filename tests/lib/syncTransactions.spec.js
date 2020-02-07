import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App";
import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";

jest.mock("@/api/transaction");
jest.mock("@/api/transaction-offline");

describe("SyncTransactions Lib", () => {
  let store;
  let wrapper;
  let localVue;

  const imageIdb = "offlineImages";
  const formIdb = "offlineForms";
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

  const expectedValueResponse = {
    id: 500000026,
    image:
      "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
    category: "FUEL",
    date: "2018-05-12T17:19:06.151Z",
    type: "Premium",
    liters: 5.0,
    unitPrice: 9000,
    created_at: "2018-05-12T17:19:06.151Z",
    modified_at: ""
  };

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

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      stubs: ["NotificationContainer", "router-view"],
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(App, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("checkConnectivityStatus method", () => {
    wrapper.vm.isSending = false;
    global.navigator = {
      onLine: true
    };
    wrapper.vm.checkDataInIDB = jest.fn();
    jest.useFakeTimers();
    wrapper.vm.checkConnectivityStatus();
    jest.advanceTimersByTime(10000);
    expect(wrapper.vm.checkDataInIDB).toHaveBeenCalled();
  });

  test("checkDataInIDB method if form and image are exist", async done => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getAllImagesFromCurrentUserId = jest
      .fn()
      .mockResolvedValue(images);
    wrapper.vm.getAllFormsFromCurrentUserId = jest
      .fn()
      .mockResolvedValue(forms);
    wrapper.vm.sendDataToServer = jest.fn();
    const spySetSendingData = jest.spyOn(wrapper.vm, "setSendingData");
    const spySendDataToServer = jest.spyOn(wrapper.vm, "sendDataToServer");
    await wrapper.vm.checkDataInIDB();
    wrapper.vm.$nextTick(() => {
      expect(spySetSendingData).toHaveBeenCalled();
      expect(spySendDataToServer).toHaveBeenCalled();
      done();
    });
  });

  test("checkDataInIDB method if form and image are not exist", async () => {
    const options = {
      methods: {
        getAllImagesFromCurrentUserId() {
          return [];
        },
        getAllFormsFromCurrentUserId() {
          return [];
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spySetSendingData = jest.spyOn(wrapper.vm, "setSendingData");
    const spySendDataToServer = jest.spyOn(wrapper.vm, "sendDataToServer");
    await wrapper.vm.checkDataInIDB();
    wrapper.vm.$nextTick(() => {
      expect(spySetSendingData).toHaveBeenCalled();
      expect(spySendDataToServer).not.toHaveBeenCalled();
    });
  });

  test("findFormByImageID method", async () => {
    offlineService.findDataByKeyFromIndexedDB = jest.fn();
    const expectedValue = {
      id: 1,
      category: "PARKING",
      amount: 100
    };
    offlineService.findDataByKeyFromIndexedDB.mockResolvedValue(expectedValue);
    expect(await wrapper.vm.findFormByImageID(formIdb, 1)).toEqual(
      expectedValue
    );
  });

  test("setSendingData", () => {
    wrapper.vm.setSendingData(true);
    expect(wrapper.vm.isSending).toBe(true);
  });

  test("getAllImagesFromCurrentUserId methods", async done => {
    offlineService.getAllDataFromIndexedDB = jest
      .fn()
      .mockResolvedValue(images);
    const spy = jest.spyOn(wrapper.vm, "checkImagesByUserId");
    wrapper.vm.getAllImagesFromCurrentUserId();
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledWith(images);
      done();
    });
  });

  test("getAllFormsFromCurrentUserId methods", async () => {
    offlineService.getAllDataFromIndexedDB = jest.fn().mockResolvedValue(forms);
    const spy = jest.spyOn(wrapper.vm, "checkFormsByUserId");
    await wrapper.vm.getAllFormsFromCurrentUserId();
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledWith(forms);
    });
  });

  test("checkImagesByUserId methods", () => {
    expect(wrapper.vm.checkImagesByUserId(images)).toEqual([images[0]]);
  });

  test("checkFormsByUserId methods", () => {
    expect(wrapper.vm.checkFormsByUserId(forms)).toEqual([forms[0]]);
  });

  test("sendDataToServer method if images and forms exists", () => {
    const images = [
      {
        id: 1,
        userId: 1,
        image: "image.jpg"
      }
    ];
    const forms = [
      {
        id: 1,
        userId: 1,
        category: "Fuel",
        title: "Fuel Example"
      }
    ];
    wrapper.vm.sendImageAndFormToServer = jest.fn();
    wrapper.vm.sendDataToServer(images, forms);
    expect(wrapper.vm.sendImageAndFormToServer).toHaveBeenCalled();
  });

  test("sendDataToServer method if only forms exists", () => {
    wrapper.vm.sendOnlyFormToServer = jest.fn();
    wrapper.vm.sendDataToServer([], forms);
    expect(wrapper.vm.sendOnlyFormToServer).toHaveBeenCalled();
  });

  test("sendDataToServer method if only images exists", () => {
    const spy = jest.spyOn(wrapper.vm, "sendOnlyImageToServer");
    wrapper.vm.sendDataToServer(images, []);
    expect(spy).toHaveBeenCalled();
  });

  test("sendDataToServer method if both images and form doesn't exists", () => {
    const spyBothImageAndForm = jest.spyOn(
      wrapper.vm,
      "sendImageAndFormToServer"
    );
    const spyOnlyImage = jest.spyOn(wrapper.vm, "sendOnlyImageToServer");
    const spyOnlyForm = jest.spyOn(wrapper.vm, "sendOnlyFormToServer");
    wrapper.vm.sendDataToServer([], []);
    expect(spyBothImageAndForm).not.toHaveBeenCalled();
    expect(spyOnlyImage).not.toHaveBeenCalled();
    expect(spyOnlyForm).not.toHaveBeenCalled();
  });

  test("sendOnlyFormToServer", async () => {
    transactionApi.saveTransaction = jest.fn().mockResolvedValue(forms[0]);
    offlineService.deleteDataByKeyFromIndexedDB = jest
      .fn()
      .mockResolvedValue(forms[0]);
    const spyGetTransaction = jest.spyOn(
      store.actions.transaction,
      "getTransactions"
    );
    const spyAddSuccessFormNotification = jest.spyOn(
      wrapper.vm,
      "addSuccessFormNotification"
    );
    const spySetSendingData = jest.spyOn(wrapper.vm, "setSendingData");
    await wrapper.vm.sendOnlyFormToServer(forms);
    wrapper.vm.$nextTick(() => {
      expect(transactionApi.saveTransaction).toHaveBeenCalled();
      expect(offlineService.deleteDataByKeyFromIndexedDB).toHaveBeenCalled();
      wrapper.vm.$nextTick(() => {
        expect(spyGetTransaction).toHaveBeenCalled();
        expect(spyAddSuccessFormNotification).toHaveBeenCalled();
        expect(spySetSendingData).toHaveBeenCalled();
      });
    });
  });

  test("sendImageObject method", () => {
    const data = {
      id: 1,
      userId: 123,
      attachments: ["image.jpg"]
    };
    const expectedValue = {
      attachments: ["image.jpg"]
    };
    expect(wrapper.vm.sendImageObject(data)).toEqual(expectedValue);
  });

  test("sendImageAndFormToServer method", async done => {
    const expectedValue = {
      id: 500000026,
      image:
        "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379"
    };
    transactionApi.createTransaction = jest
      .fn()
      .mockResolvedValue(expectedValue);
    wrapper.vm.sendImageObject = jest.fn();
    wrapper.vm.successCreateTransaction = jest.fn();
    await wrapper.vm.sendImageAndFormToServer(images, 0);
    wrapper.vm.$nextTick(() => {
      expect(transactionApi.createTransaction).toHaveBeenCalled();
      expect(wrapper.vm.sendImageObject).toHaveBeenCalled();
      expect(wrapper.vm.successCreateTransaction).toHaveBeenCalled();
      done();
    });
  });

  test("successCreateTransaction method", () => {
    offlineService.deleteDataByKeyFromIndexedDB = jest.fn();
    wrapper.vm.sendFormAfterImageToServer = jest.fn(function(a, b, c) {
      c.success();
    });

    wrapper.vm.successCreateTransaction(forms[0], images, 0);
    expect(offlineService.deleteDataByKeyFromIndexedDB).toHaveBeenCalled();
    expect(wrapper.vm.sendFormAfterImageToServer).toHaveBeenCalled();
  });

  test("sendImageAndFormToServer at the end of loop", () => {
    transactionApi.createTransaction = jest.fn();
    transactionApi.createTransaction.mockResolvedValue(expectedValueResponse);
    wrapper.vm.sendImageAndFormToServer(images, 2);
    expect(transactionApi.createTransaction).not.toHaveBeenCalled();
  });

  test("sendFormAfterImageToServer method", async done => {
    const formID = 1;
    const response = {
      data: {
        data: {
          image: "image.jpg"
        }
      }
    };
    const functions = {
      getTransactions: jest.fn(),
      sendImageAndFormToServer: jest.fn()
    };
    const success = {
      success: () => functions
    };
    wrapper.vm.findFormByImageID = jest.fn().mockResolvedValue(forms[0]);
    transactionApi.saveTransaction = jest
      .fn()
      .mockResolvedValue(expectedValueResponse);
    offlineService.deleteDataByKeyFromIndexedDB = jest.fn();
    const spyAddSuccessImageNotification = jest.spyOn(
      wrapper.vm,
      "addSuccessImageNotification"
    );
    const spyAddSuccessFormNotification = jest.spyOn(
      wrapper.vm,
      "addSuccessFormNotification"
    );
    const spySetSendingData = jest.spyOn(wrapper.vm, "setSendingData");
    await wrapper.vm.sendFormAfterImageToServer(formID, response, success);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.findFormByImageID).toHaveBeenCalled();
      expect(transactionApi.saveTransaction).toHaveBeenCalled();
      expect(offlineService.deleteDataByKeyFromIndexedDB).toHaveBeenCalled();
      expect(spyAddSuccessImageNotification).toHaveBeenCalled();
      expect(spyAddSuccessFormNotification).toHaveBeenCalled();
      expect(spySetSendingData).toHaveBeenCalled();
      done();
    });
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

  test("clear timeout", () => {
    wrapper.destroy();
    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });
});
