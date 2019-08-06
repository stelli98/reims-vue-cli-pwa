import { shallowMount, createLocalVue } from "@vue/test-utils";
import NotificationBar from "@/components/NotificationBar.vue";
import Vuex from "vuex";

describe("NotificationBar.vue", () => {
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

  function initializeStore () {
    const actions = {
      removeNotification: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        notification: {
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
  function generateLocalVue () {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper (store) {
    return shallowMount(NotificationBar, {
      store,
      localVue,
      propsData: {
        notification: notificationsData[1]
      },
      sync: false
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("notification will be delete after 5 seconds", () => {
    const spy = jest.spyOn(store.actions, "removeNotification");
    expect(spy).not.toBeCalled();
    jest.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 5000);
  });

  // test('clear timeout', () => {
  //   // spy 
  //   // pakai unmount
  //   jest.runAllTimers();
  //   expect(clearTimeout).toHaveBeenCalledTimes(1)
  // })
});
