import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionForm from "@/components/TransactionForm.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

const routes = [
  {
    path: "/transactions/create/:step",
    name: "create"
  },
  {
    path: "/home",
    name: "home"
  }
];

describe("TransactionForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const fuelData = data.find(
    d => d.url == url.transaction && d.method == "POST"
  );

  function initializeStore () {
    const state = {
      OCRResultType: fuelData.data.category
    };
    const actions = {
      setFormEmpty: jest.fn(),
      setOCRResultType: jest.fn()
    };
    const getters = {
      OCRResultType: state => state.OCRResultType
    };
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
      getters,
      actions
    };
  }

  function generateLocalVue () {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper (store, options) {
    const router = new VueRouter({ routes });
    const defaultOptions = {
      store,
      localVue,
      router,
      stub: [
        "FuelForm",
        "ParkingForm"
      ],
      sync: false
    };
    const mergeOptions = { ...options, ...defaultOptions };
    return shallowMount(TransactionForm, mergeOptions);
  }

  beforeEach(() => {
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
    expect(wrapper.vm.$route.name).toBe("create");
    expect(wrapper.vm.$route.params.step).not.toEqual(1);
  });

  test("computed parkingTemplate", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    const expectedValue = {
      data: {
        category: "PARKING",
        date: "",
        out: "",
        amount: 100,
        title: "",
        parkingType: "",
        license: "",
        location: "",
        hours: 0,
        userId: "",
        image: ""
      }
    };
    expect(wrapper.vm.parkingTemplate).toEqual(expectedValue);
  });

  test("computed parkingTemplate", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    const expectedValue = {
      data: {
        category: "FUEL",
        date: "",
        fuelType: "",
        liters: 0.01,
        amount: 100,
        title: "",
        userId: "",
        image: ""
      }
    };
    expect(wrapper.vm.fuelTemplate).toEqual(expectedValue);
  });

  test("computed isSwitchOn", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.isSwitchOn).toEqual(false);
  });

  test("toogle method", () => {
    const options = {
      propsData: {
        pictureUrl: "image.jpg"
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(store.actions, "setOCRResultType");
    wrapper.vm.toggle();
    expect(spy).toHaveBeenCalled();
  });

  test("emptyAllForm method", () => {
    const spy = jest.spyOn(wrapper.vm, 'setFormEmpty');
    wrapper.vm.emptyAllForm();
    expect(spy).toHaveBeenCalledTimes(2);
  })

  // test("saveData method", async () => {
  //   const options = {
  //     mocks: {
  //       // $refs: {
  //       //   sendForm: {
  //       //     sendParkingForm: () => Promise.resolve('true'),
  //       //     sendFuelForm: () => Promise.resolve('true')
  //       //   }
  //       // },
  //       isSwitchOn: () => false
  //     },
  //     propsData: {
  //       pictureUrl: "image.jpg"
  //     }
  //   }
  //   wrapper = createWrapper(store.store, options);
  //   console.log(wrapper.vm)
  //   const spy = jest.spyOn(wrapper.vm, 'setFormEmpty');
  //   await wrapper.vm.saveData();
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });
});
