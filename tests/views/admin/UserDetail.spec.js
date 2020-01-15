import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserDetail from "@/views/admin/UserDetail";

describe("UserDetail.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue() {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper() {
    return shallowMount(UserDetail, {
      mocks: {
        $route: {
          query: {
            activeTab: "UserPersonalDetail"
          }
        },
        $router: {
          push: jest.fn()
        }
      },
      localVue,
      stubs: ["UserPersonalDetail", "UserFamilyDetail", "GlobalHeader"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("switchTab method", () => {
    const payload = true;
    wrapper.vm.isComponentActive = !payload;
    wrapper.vm.switchTab(payload);
    expect(wrapper.vm.isComponentActive).toBe(payload);
    expect(wrapper.vm.currentComponent).toBe("UserPersonalDetail");
  });

  test("moveTo method", () => {
    const spy = jest.spyOn(wrapper.vm.$router,"push");
    wrapper.vm.moveTo("users");
    expect(spy).toHaveBeenCalled();
  });

});
