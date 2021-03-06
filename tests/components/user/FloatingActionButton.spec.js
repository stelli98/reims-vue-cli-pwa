import { shallowMount, createLocalVue } from "@vue/test-utils";
import FloatingActionButton from "@/components/user/FloatingActionButton";
import Vuex from "vuex";

const WRONG_EXT =
  "We only accept .jpg, .jpeg, .png ext. Please reupload receipt";
const TOO_MANY_IMAGES =
  "You only can insert up to 5 images. Please reupload again.";

describe("FloatingActionButton.vue", () => {
  let store;
  let wrapper;
  let localVue;

  function initializeStore() {
    const user = initializeUserStore();
    const transaction = initializeTransactionStore();

    const store = new Vuex.Store({
      modules: {
        transaction,
        user
      }
    });

    return {
      store,
      actions: {
        transaction: transaction.actions
      },
      state: {
        user: user.state
      },
      getters: {
        user: user.getters
      }
    };
  }

  function initializeUserStore() {
    const state = {
      hasVehicle: true
    };
    const getters = {
      hasVehicle: state => state.hasVehicle
    };
    const namespaced = true;
    return { state, getters, namespaced };
  }

  function initializeTransactionStore() {
    const actions = {
      setImage: jest.fn(),
      setImages: jest.fn()
    };
    const namespaced = true;
    return { namespaced, actions };
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
      stubs: ["PopUpMessage"],
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

  test("methods onOCRFileChange if user hasVehicle", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    global.URL.createObjectURL = jest.fn();
    const spyUploadImage = jest.spyOn(wrapper.vm, "uploadImage");
    const e = {
      target: {
        files: [
          {
            name: "image.jpg"
          }
        ]
      }
    };
    wrapper.vm.onOCRFileChange(e, "fuel");
    expect(spyUploadImage).toHaveBeenCalled();
  });

  test("methods onOCRFileChange if user doesn't hasVehicle", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    store.state.user.hasVehicle = false;
    global.URL.createObjectURL = jest.fn();
    const spyUploadImage = jest.spyOn(wrapper.vm, "uploadImage");
    const e = {
      target: {
        files: [
          {
            name: "image.jpg"
          }
        ]
      }
    };
    wrapper.vm.onOCRFileChange(e, "fuel");
    expect(spyUploadImage).not.toHaveBeenCalled();
  });

  test("methods uploadImage if image Ext is correct", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    global.URL.createObjectURL = jest.fn();
    const spyCheckType = jest.spyOn(wrapper.vm, "checkType");
    const spySetImage = jest.spyOn(store.actions.transaction, "setImage");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const image = {
      name: "image.jpg"
    };
    wrapper.vm.uploadImage(image, "fuel");
    expect(spyCheckType).toHaveBeenCalled();
    expect(spySetImage).toHaveBeenCalled();
    expect(spyRoute).toHaveBeenCalled();
  });

  test("methods uploadImage if image Ext is false", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    global.URL.createObjectURL = jest.fn();
    const spyCheckType = jest.spyOn(wrapper.vm, "checkType");
    const spySetImage = jest.spyOn(store.actions.transaction, "setImage");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const spyShowErrorMessage = jest.spyOn(wrapper.vm, "showErrorMessage");
    const image = {
      name: "image.svg"
    };
    wrapper.vm.uploadImage(image, "fuel");
    expect(spyCheckType).toHaveBeenCalled();
    expect(spySetImage).not.toHaveBeenCalled();
    expect(spyRoute).not.toHaveBeenCalled();
    expect(spyShowErrorMessage).toHaveBeenCalled();
  });

  test("methods onNonOCRFileChange if total image less than 5 and ext is correct", async done => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const fileReaderFunction = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn()
    };
    window.FileReader = jest.fn(() => fileReaderFunction);
    const spyCheckTotalImagesLessThanFive = jest.spyOn(
      wrapper.vm,
      "checkTotalImagesLessThanFive"
    );
    const spyCheckImageConsistOfWrongExtension = jest.spyOn(
      wrapper.vm,
      "checkImageConsistOfWrongExtension"
    );
    const spySetImages = jest.spyOn(store.actions.transaction, "setImages");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const e = {
      target: {
        files: [
          {
            name: "image1.jpg"
          },
          {
            name: "image2.jpg"
          }
        ]
      }
    };
    wrapper.vm.onNonOCRFileChange(e);

    setTimeout(() => {
      fileReaderFunction.onloadend();
      expect(spyCheckTotalImagesLessThanFive).toHaveBeenCalled();
      expect(spyCheckImageConsistOfWrongExtension).toHaveBeenCalled();
      expect(spySetImages).toHaveBeenCalled();
      expect(spyRoute).toHaveBeenCalled();
      done();
    }, 500);
  });

  test("methods onNonOCRFileChange if total image less than 5 and ext is wrong", async done => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const fileReaderFunction = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn()
    };
    window.FileReader = jest.fn(() => fileReaderFunction);
    const spyCheckTotalImagesLessThanFive = jest.spyOn(
      wrapper.vm,
      "checkTotalImagesLessThanFive"
    );
    const spyCheckImageConsistOfWrongExtension = jest.spyOn(
      wrapper.vm,
      "checkImageConsistOfWrongExtension"
    );
    const spySetImages = jest.spyOn(store.actions.transaction, "setImages");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const e = {
      target: {
        files: [
          {
            name: "image1.jpg"
          },
          {
            name: "image2.svg"
          }
        ]
      }
    };
    wrapper.vm.onNonOCRFileChange(e);

    setTimeout(() => {
      fileReaderFunction.onloadend();
      expect(spyCheckTotalImagesLessThanFive).toHaveBeenCalled();
      expect(spyCheckImageConsistOfWrongExtension).toHaveBeenCalled();
      expect(spySetImages).not.toHaveBeenCalled();
      expect(spyRoute).not.toHaveBeenCalled();
      done();
    }, 500);
  });

  test("methods onNonOCRFileChange if total image more than 5 and ext is correct", async done => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const fileReaderFunction = {
      readAsDataURL: jest.fn(),
      onloadend: jest.fn()
    };
    window.FileReader = jest.fn(() => fileReaderFunction);
    const spyCheckTotalImagesLessThanFive = jest.spyOn(
      wrapper.vm,
      "checkTotalImagesLessThanFive"
    );
    const spyCheckImageConsistOfWrongExtension = jest.spyOn(
      wrapper.vm,
      "checkImageConsistOfWrongExtension"
    );
    const spySetImages = jest.spyOn(store.actions.transaction, "setImages");
    const spyRoute = jest.spyOn(wrapper.vm.$router, "push");
    const e = {
      target: {
        files: [
          {
            name: "image1.jpg"
          },
          {
            name: "image2.jpg"
          },
          {
            name: "image3.jpg"
          },
          {
            name: "image4.jpg"
          },
          {
            name: "image5.jpg"
          },
          {
            name: "image6.jpg"
          }
        ]
      }
    };
    wrapper.vm.onNonOCRFileChange(e);

    setTimeout(() => {
      fileReaderFunction.onloadend();
      expect(spyCheckTotalImagesLessThanFive).toHaveBeenCalled();
      expect(spyCheckImageConsistOfWrongExtension).not.toHaveBeenCalled();
      expect(spySetImages).not.toHaveBeenCalled();
      expect(spyRoute).not.toHaveBeenCalled();
      done();
    }, 500);
  });

  test("toggleDisplayMenu before it's clicked", () => {
    expect(wrapper.vm.displayMenu).toEqual(false);
  });

  test("toggleDisplayMenu after it's clicked", () => {
    wrapper.vm.toggleDisplayMenu();
    expect(wrapper.vm.displayMenu).toEqual(true);
  });

  test("checkType if image has wrong ext", () => {
    const image = "image.svg";
    expect(wrapper.vm.checkType(image)).toBe(false);
  });

  test("checkType if image has correct ext", () => {
    const image = "image.jpg";
    expect(wrapper.vm.checkType(image)).toBe(true);
  });

  test("checkTotalImagesLessThanFive if total image is 6 ", () => {
    const spy = jest.spyOn(wrapper.vm, "showErrorMessage");
    expect(wrapper.vm.checkTotalImagesLessThanFive(6)).toBe(false);
    expect(spy).toHaveBeenCalled();
  });

  test("checkTotalImagesLessThanFive if total image is 5 ", () => {
    const spy = jest.spyOn(wrapper.vm, "showErrorMessage");
    expect(wrapper.vm.checkTotalImagesLessThanFive(5)).toBe(true);
    expect(spy).not.toHaveBeenCalled();
  });
});
