import { shallowMount, createLocalVue } from "@vue/test-utils";
import PopUpModal from "@/components/common/PopUpModal";

describe("PopUpModal.vue", () => {
  let wrapper;
  let localVue;
  function generateLocalVue() {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper() {
    return shallowMount(PopUpModal, {
      localVue,
      propsData: {
        isOpen: true,
        title: 'Title-2'
      },
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("PopModal.vue", () => {});
});
