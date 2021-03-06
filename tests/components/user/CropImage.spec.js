import { shallowMount, createLocalVue } from "@vue/test-utils";
import CropImage from "@/components/user/CropImage";
import Vuex from "vuex";
import Croppa from "vue-croppa";

describe("CropImage.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const state = {
      image: "image.jpg"
    };

    const getters = {
      image: state => state.image
    };

    const actions = {
      setImage: jest.fn()
    }

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
      actions,
      getters
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(Croppa, { componentName: "Croppa" });
    return lv;
  }

  function createWrapper(store, options) {
    const defaultOptions = {
      store,
      localVue,
      stubs: ["Croppa"],
      sync: false
    };
    const mergeOptions = { ...options, ...defaultOptions };
    return shallowMount(CropImage, mergeOptions);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });


  test("CropImage created", async () => {
    const obj = {
      checkContainsType: jest.fn(),
     };
    const created = CropImage.created.bind(obj);
    created();
    expect(obj.checkContainsType).toHaveBeenCalled();
  });



  test("checkContainsType method if params type is found", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
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

  test("method generateImage if hasImage is true", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            hasImage: jest.fn().mockReturnValue(true),
            generateDataUrl: jest.fn().mockReturnValue("data/image.png")
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy1 = jest.spyOn(wrapper.vm.myCroppa, "hasImage");
    wrapper.vm.generateImage();
    expect(spy1).toHaveBeenCalled();
    expect(wrapper.vm.generateImage()).toBe("data/image.png");
  });

  test("method generateImage if hasImage is false", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            hasImage: jest.fn().mockReturnValue(false),
            generateDataUrl: jest.fn().mockReturnValue("data/image.png")
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy1 = jest.spyOn(wrapper.vm.myCroppa, "hasImage");
    wrapper.vm.generateImage();
    expect(spy1).toHaveBeenCalled();
    expect(wrapper.vm.generateImage()).not.toBe("data/image.png");
  });

  test("method filpXImage", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            flipX: jest.fn()
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.myCroppa, "flipX");
    wrapper.vm.flipXImage();
    expect(spy).toHaveBeenCalled();
  });

  test("method filpYImage", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            flipY: jest.fn()
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.myCroppa, "flipY");
    wrapper.vm.flipYImage();
    expect(spy).toHaveBeenCalled();
  });

  test("method rotateRight", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            rotate: jest.fn()
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.myCroppa, "rotate");
    wrapper.vm.rotateRight();
    expect(spy).toHaveBeenCalled();
  });

  test("method rotateLeft", () => {
    const options = {
      data: () => {
        return {
          myCroppa: {
            rotate: jest.fn()
          }
        };
      },  
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.myCroppa, "rotate");
    wrapper.vm.rotateLeft();
    expect(spy).toHaveBeenCalled();
  });

  test("moveToFilterImage",()=>{
    const options = {
      data: () => {
        return {
          myCroppa: {
            hasImage: jest.fn().mockReturnValue(true),
            generateDataUrl: jest.fn().mockReturnValue("data/image.png")
          }
        };
      },
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "FUEL"
          }
        }
      }
    };
    wrapper = createWrapper(store.store,options);
    const spyGenerateImage = jest.spyOn(wrapper.vm, "generateImage");
    const spyRouterPush = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.moveToFilterImage();
    expect(spyGenerateImage).toHaveBeenCalled()
    expect(spyRouterPush).toHaveBeenCalled()
  })
});
