import { shallowMount, createLocalVue } from "@vue/test-utils";
import FilterImage from "@/components/FilterImage";
import Vuex from "vuex";

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
      setOCRResultType: jest.fn(), 
      setImage: jest.fn()
    };
    const namespaced = true;
    return { state,getters, actions, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store,options) {
    const defaultConfig = {
      store,
      localVue,
      sync: false,
      attachToDocument: true
    }
    const mergeConfig = {...options, ...defaultConfig}
    return shallowMount(FilterImage, mergeConfig);
  }

  beforeEach(() => {
    const createElement = document.createElement.bind(document);
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

  test("FilterImage created", async () => {
    const obj = {
      checkContainsType: jest.fn(),
      checkContainsImage: jest.fn(),
      setFilterToDefault: jest.fn()
    };
    const created = FilterImage.created.bind(obj);
    created();
    expect(obj.checkContainsType).toHaveBeenCalled();
    expect(obj.checkContainsImage).toHaveBeenCalled();
    expect(obj.setFilterToDefault).toHaveBeenCalled();
  });

  test("uploadImageOCR method if app is online", async () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options)
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
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options)
    store.actions.transaction.createTransaction.mockRejectedValue(() =>
      Promise.reject()
    );
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
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options)
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

  test("filterImage Method", ()=>{
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options)
    const spyGenerateImage = jest.spyOn(wrapper.vm, "generateImage");
    const spyActionSetImage = jest.spyOn(store.actions.transaction, "setImage");
    wrapper.vm.filterImage();
    expect(spyGenerateImage).toHaveBeenCalled();
    expect(spyActionSetImage).toHaveBeenCalled();
  })

  test("checkContainsImage method", ()=>{
    const options = {
          mocks: {
            $router: {
              push: jest.fn()
            },
            $route: {
              query: {
                type: "fuel"
              }
            }
          }
        };
        store.state.transaction.image = ""
        wrapper = createWrapper(store.store,options);
        wrapper.vm.checkContainsImage()
        const spyRouterPush = jest.spyOn(wrapper.vm.$router, 'push');
        expect(spyRouterPush).toHaveBeenCalled()
  })


  test("checkContainsType method if params type is found", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsType();
    expect(spy).not.toHaveBeenCalled();
  });

  test("checkContainsType method if params type is not found", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            type: ""
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.checkContainsType();
    expect(spy).toHaveBeenCalled();
  });


});
