import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionList from "@/components/TransactionList.vue";
import data from "@/api-mock/mock-data";
import config from "@/config";

const defaultOptions = {
  mocks: { $route: { query: {} } }
}

const url = config.api.transactions;
describe("TransactionList.vue", () => {
  let wrapper;
  let localVue;
  const transactionData = data.find(
    d => d.url === url.transaction && d.params.page == 1
  );

  function generateLocalVue () {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper (newOptions) {
    const options = newOptions ? newOptions : defaultOptions
    const defaultConfig = {
      localVue,
      stubs: ["TransactionCard"],
      propsData: {
        transactions: transactionData.data
      }
    }
    const mergeConfig = { ...options, ...defaultConfig }
    return shallowMount(TransactionList, mergeConfig)
  }

  beforeEach(() => {
    localVue = generateLocalVue();
  });

  test("Emit openFilter", () => {
    wrapper = createWrapper();
    wrapper.vm.openFilter();
    expect(wrapper.emitted().openFilter).toEqual([[true]]);
  });

  test("Emit updateTransactions", () => {
    wrapper = createWrapper();
    wrapper.vm.updateTransactions();
    expect(wrapper.emitted().updateTransactions).toEqual([[]]);
  });

  test("Emit downloadReport", () => {
    wrapper = createWrapper();
    wrapper.vm.downloadReport();
    expect(wrapper.emitted().downloadReport).toEqual([[]]);
  });
});
