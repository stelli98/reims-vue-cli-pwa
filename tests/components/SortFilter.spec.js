import { shallowMount, createLocalVue } from "@vue/test-utils";
import SortFilter from "@/components/SortFilter";
import TextFilter from "@/filters/text";
import DateTime from "vue-datetime";
import VueRouter from "vue-router";

const routes = [
  {
    path: "/home",
    name: "home"
  }
];

describe("SortFilter.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue () {
    const lv = createLocalVue();
    lv.use(DateTime);
    lv.use(VueRouter);
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper () {
    const router = new VueRouter({ routes });
    return shallowMount(SortFilter, {
      localVue,
      router,
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
    wrapper.vm.options.start = "2019-08-10T06:40:59.000Z"
    wrapper.vm.options.end = "2019-08-12T06:40:59.000Z"
    const spy = jest.spyOn(wrapper.vm, 'moveTo')
    wrapper.vm.applyFilter();
    const options = {
      search: "",
      sortBy: "date",
      category: "",
      start: 1565419259000,
      end: 1565592059000,
      page: 1
    };
    expect(wrapper.vm.options).toEqual(options)
    expect(spy).toHaveBeenCalled()
  });

  test("formatStart computed", () => {
    wrapper.setData({ formatStart: 1565419259000 })
    expect(wrapper.vm.formatStart).toBe("2019-08-10T06:40:59.000Z")
  })

  test("formatEnd computed", () => {
    wrapper.setData({ formatEnd: 1565419259000 })
    expect(wrapper.vm.formatEnd).toBe("2019-08-10T06:40:59.000Z")
  })

  test("emptyOptions return empty options", () => {
    wrapper.vm.emptyOptions();
    const options = {
      search: "",
      sortBy: "date",
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
      sortBy: "date",
      category: "",
      start: "",
      end: ""
    };
    expect(wrapper.vm.options).toEqual(options);
  });
});
