import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionList from "@/components/TransactionList.vue";
import data from "@/api-mock/mock-data";
import config from "@/config";
import { ModalBus } from "@/components/js/event-bus.js";
import TextFilter from "@/filters/text";

const url = config.api.transactions;
describe("TransactionList.vue", () => {
  let wrapper;
  let localVue;
  const transactionData = data.find(
    d => d.url === url.transaction && d.params.page == 1
  );

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper(options) {
    const defaultOptions = {
      localVue,
      stubs: ["TransactionCard", "PopUpModalRoot"],
      propsData: {
        transactions: transactionData.data
      }
    };
    const mergeConfig = { ...options, ...defaultOptions };
    return shallowMount(TransactionList, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
  });

  test("Emit openFilter", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            category: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(options);
    wrapper.vm.openFilter();
    expect(wrapper.emitted().openFilter).toEqual([[true]]);
  });

  test("Emit downloadReport", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            category: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(options);
    const spyModalBus = jest.spyOn(ModalBus, "$emit");
    wrapper.vm.downloadReport();
    expect(spyModalBus).toHaveBeenCalled();
  });

  test("Emit deleteTransaction", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            category: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(options);
    wrapper.vm.deleteTransaction();
    expect(wrapper.emitted("deleteTransaction")).toBeTruthy();
  });

  test("selectedTransactionType watch", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "fuel"
          }
        },
        selectedTransactionType() {
          return "fuel";
        }
      }
    };
    wrapper = createWrapper(options);
    wrapper.vm.selectedTransactionType = "parking";
    const spyRouterPush = jest.spyOn(wrapper.vm.$router, "push");
    expect(spyRouterPush).toHaveBeenCalled();
  });

  test("isFiltering if filter search is on", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            search: "fuel monas",
            category: "fuel"
          }
        }
      }
    };
    wrapper = createWrapper(options);
    expect(wrapper.vm.isFiltering).toBe(true)
  });

  test("isFiltering if filter search is off", () => {
    const options = {
      mocks: {
        $route: {
          query: {
            category: "fuel",
            sortBy: "date"
          }
        }
      }
    };
    wrapper = createWrapper(options);
    expect(wrapper.vm.isFiltering).toBe(false)
  });
});
