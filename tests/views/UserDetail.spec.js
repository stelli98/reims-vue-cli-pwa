import {shallowMount, createLocalVue} from "@vue/test-utils";
import UserDetail from "@/views/UserDetail";

describe("UserDetail.vue", ()=>{
    let wrapper;
    let localVue;

    function generateLocalVue(){
        const lv = createLocalVue();
        return lv;
    }

    function createWrapper(){
        return shallowMount(UserDetail, {
            localVue,
            stubs: ['UserPersonalDetail','UserFamilyDetail'],
            sync: false
        });
    }

    beforeEach(()=>{
        localVue = generateLocalVue();
        wrapper = createWrapper();
    })

    test("switchTab method", ()=>{
        expect(wrapper.vm.isComponentActive).toBe(true)
        expect(wrapper.vm.currentComponent).toBe("UserPersonalDetail")
        wrapper.vm.switchTab()
        expect(wrapper.vm.isComponentActive).toBe(false)
        expect(wrapper.vm.currentComponent).toBe("UserFamilyDetail")
    })
})