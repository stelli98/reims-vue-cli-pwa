import { shallowMount, createLocalVue } from "@vue/test-utils";
import Pagination from "@/components/Pagination.vue";
import VueRouter from "vue-router";

const routes = []

describe('Pagination.vue', () => {
    let wrapper;
    let localVue;
    const paginationData = {
        pageNumber: 1,
        pageSize: 5,
        totalPage: 2,
        totalRecords: 10
    }

    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(VueRouter);
        return lv;
    }

    function createWrapper () {
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

    test('Emit changePage moveTo method', () => {
        wrapper.vm.moveTo(2)
        expect(wrapper.emitted().changePage).toEqual([[2]])
    })

})