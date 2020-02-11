import { shallowMount, createLocalVue } from "@vue/test-utils";
import Pagination from "@/components/common/Pagination.vue";
import VueRouter from "vue-router";

const routes = [];

describe("Pagination.vue", () => {
  let wrapper;
  let localVue;
  const paginationData = {
    pageNumber: 1,
    pageSize: 5,
    totalPage: 2,
    totalRecords: 10
  };

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(VueRouter);
    return lv;
  }

  function createWrapper() {
    const router = new VueRouter({ routes });
    return shallowMount(Pagination, {
      localVue,
      router,
      propsData: {
        paging: paginationData
      },
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("changePageTo method", () => {
    wrapper.vm.changePageTo("2");
    expect(wrapper.vm.$route.query.page).toBe(2)
  });

  test("watcher", () => {
    wrapper.vm.$router.push({ query: { page: 4 } });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentPage).toBe(4);
    });
  });
});
