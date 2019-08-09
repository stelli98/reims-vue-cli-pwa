import { shallowMount, createLocalVue } from "@vue/test-utils";
import SortFilter from "@/components/SortFilter";
import TextFilter from "@/filters/text";
import DateTime from "vue-datetime";

describe("UserCard.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue () {
    const lv = createLocalVue();
    lv.use(DateTime);
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper () {
    return shallowMount(SortFilter, {
      localVue,
      stubs: ["Datetime"]
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("Emit moveTo", () => {
    wrapper.vm.moveTo();
    expect(wrapper.emitted().closeFilter).toEqual([[false]]);
  });

  test("Emit applyFilter", () => {
    wrapper.vm.applyFilter();
    const options = {
      search: "",
      sortBy: "",
      category: "",
      start: "",
      end: ""
    };
    expect(wrapper.emitted().applyFilter).toEqual([[options]]);
  });

  test("emptyOptions return empty options", () => {
    wrapper.vm.emptyOptions();
    const options = {
      search: "",
      sortBy: "",
      category: "",
      start: "",
      end: ""
    };
    expect(wrapper.vm.emptyOptions()).toEqual(options);
  });

  test("resetFilter set options to default", () => {
    wrapper.vm.resetFilter();
    const options = {
      search: "",
      sortBy: "",
      category: "",
      start: "",
      end: ""
    };
    expect(wrapper.vm.options).toEqual(options);
  });
});
