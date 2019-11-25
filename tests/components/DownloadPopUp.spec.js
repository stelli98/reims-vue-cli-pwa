import { shallowMount, createLocalVue } from "@vue/test-utils";
import DownloadPopUp from "@/components/DownloadPopUp";
import Vuex from "vuex";

describe("DownloadPopUp.vue", () => {
  let store;
  let wrapper;
  let localVue;
  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      sync: false
    };
    const mergeConfig = { ...options, ...defaultConfig };
    return shallowMount(DownloadPopUp, mergeConfig);
  }

  function initializeStore() {
    const actions = {
      downloadPersonalReport: jest.fn()
    };

    const store = new Vuex.Store({
      modules: {
        user: {
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

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("downloadReport method", () => {
    const options = {
      mocks: {
        computed: {
          selectedTransactionType() {
            return "FUEL";
          },
          selectedMonth() {
            return "March";
          },
          selectedYear() {
            return 2019;
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spyStore = jest.spyOn(store.actions, "downloadPersonalReport");
    wrapper.vm.downloadReport();
    expect(spyStore).toHaveBeenCalled();
  });

  test("selectedMonth computed", () => {
    const monthMarch = "March";
    wrapper.setData({ selectedMonth: monthMarch });
    expect(wrapper.vm.selectedMonth).toBe(monthMarch);
  });

  test("selectedMonth computed if selectedYear is current year", () => {
    const options = {
      mocks: {
        computed: {
          selectedYear() {
            return 2017;
          }
        }
      }
    };
    const expectedValue = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November"
    ];
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.months).toEqual(expectedValue);
  });

  test("selectedMonth computed if selectedYear is before the current year", () => {
    const options = {
      mocks: {
        computed: {
          selectedYear() {
            return 2017;
          }
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    wrapper.vm.selectedYear = 2017
    expect(wrapper.vm.months).toEqual(wrapper.vm.monthsName);
  });
});
