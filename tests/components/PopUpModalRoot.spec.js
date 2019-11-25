import { createLocalVue, shallowMount } from "@vue/test-utils";
import PopUpModalRoot from "@/components/PopUpModalRoot";
import { ModalBus } from "@/components/js/event-bus.js";

jest.mock("@/components/js/event-bus.js");

describe("PopUpModalRoot.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue() {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper() {
    return shallowMount(PopUpModalRoot, {
      localVue,
      stubs: ["PopUpModal"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("handleClose method", async done => {
    wrapper.vm.handleClose();
    ModalBus.$emit("open", {
      component: "",
      title: "Download Report"
    });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.component).toEqual("");
      done();
    });
  });

  test("setUpNewComponent method", () => {
    const payload = {
      component: "",
      title: "Download Report",
      props: null,
      closeOnClick: true
    };
    wrapper.vm.setUpNewComponent(payload);
    expect(wrapper.vm.component).toEqual(payload.component);
    expect(wrapper.vm.title).toEqual(payload.title);
    expect(wrapper.vm.props).toEqual(payload.props);
    expect(wrapper.vm.closeOnClick).toEqual(payload.closeOnClick);
  });

  test("handleModalClose methods if closeOnClick is false", () => {
    wrapper.vm.handleModalClose();
    const spy = jest.spyOn(wrapper.vm, "handleClose");
    expect(spy).not.toHaveBeenCalled();
  });

  test("handleModalClose methods if closeOnClick is true", () => {
    wrapper.vm.closeOnClick = true;
    const spy = jest.spyOn(wrapper.vm, "handleClose");
    wrapper.vm.handleModalClose();
    expect(spy).toHaveBeenCalled();
  });
});
