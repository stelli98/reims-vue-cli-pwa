import { shallowMount, createLocalVue } from "@vue/test-utils";
import SyncDraftCard from "@/components/user/SyncDraftCard";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import priceFilter from "@/filters/price";

describe("SyncDraftCard.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    lv.filter("priceFormatter", priceFilter);
    return lv;
  }

  function createWrapper() {
    return shallowMount(SyncDraftCard, {
      localVue,
      propsData: {
        transaction: {
          title: "Medical 1",
          price: 100,
          category: "MEDICAL",
          date: Date.now()
        }
      },
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("transactionCategory method", () => {
    expect(wrapper.vm.transactionCategory("FUEL")).toBe("fuel");
  });

  test("transactionCategory method undefined", () => {
    expect(wrapper.vm.transactionCategory(undefined)).toBe("medical");
  });
});
