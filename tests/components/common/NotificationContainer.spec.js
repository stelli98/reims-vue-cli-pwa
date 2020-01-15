import { shallowMount, createLocalVue } from "@vue/test-utils";
import NotificationContainer from "@/components/common/NotificationContainer.vue";
import Vuex from "vuex";

describe("NotificationContainer.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const notificationsData = [
    {
      type: "success",
      message: "Image has been submitted."
    },
    {
      type: "error",
      message: "Oops ! error"
    }
  ];

  function initializeStore() {
    const state = {
      notifications: notificationsData
    };

    const getters = {
      notifications: state => state.notifications
    };

    const store = new Vuex.Store({
      modules: {
        notification: {
          state,
          getters,
          namespaced: true
        }
      }
    });

    return {
      store,
      state,
      getters
    };
  }
  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store) {
    return shallowMount(NotificationContainer, {
      store,
      localVue,
      stubs: ["NotificationBar"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("", () => {});
});
