import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserList from "@/components/admin/UserList.vue";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.admin;
describe("UserList.vue", () => {
  let wrapper;
  let localVue;
  const userData = data.find(d => d.url === url.user && d.params.page == 1);

  function generateLocalVue() {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper() {
    return shallowMount(UserList, {
      localVue,
      stubs: ["UserCard"],
      propsData: {
        users: userData.data
      }
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("Emit deleteUser", () => {
    wrapper.vm.deleteUser();
    expect(wrapper.emitted('deleteUser')).toBeTruthy()
  });
});
