import { shallowMount, createLocalVue } from "@vue/test-utils";
import DownloadPopUp from "@/components/common/DownloadPopUp";
import Vuex from "vuex";
import TextFilter from "@/filters/text";

describe("DownloadPopUp.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const response = {
    data: {
      data: "iV91iop"
    }
  };

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.filter("textFormatter", TextFilter);
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
      downloadPersonalReport: jest.fn().mockResolvedValue(response)
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

  test("download Report method", async done => {
    wrapper = createWrapper(store.store);
    await wrapper.vm.downloadReport();
    wrapper.vm.$nextTick(() => {
      expect(store.actions.downloadPersonalReport).toHaveBeenCalled();
      done();
    });
  });

  test("selectedMonth computed", () => {
    wrapper = createWrapper(store.store);
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
    const monthsData = [
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
      "November",
      "December"
    ];
    const expectedValue = new Date().getMonth();
    wrapper = createWrapper(store.store, options);
    expect(wrapper.vm.months[wrapper.vm.months.length - 1]).toEqual(
      monthsData[expectedValue]
    );
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
    wrapper.vm.selectedYear = 2017;
    expect(wrapper.vm.months).toEqual(wrapper.vm.monthsName);
  });
});
