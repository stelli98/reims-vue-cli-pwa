import { shallowMount, createLocalVue } from "@vue/test-utils";
import ViewFuelDetail from "@/components/ViewFuelDetail"
import priceFilter from "@/filters/price";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

describe("TransactionDetail.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const transactionData = data.find(d =>
        d.url === url.transaction + "/2"
    );


    function generateLocalVue () {
        const lv = createLocalVue();
        lv.filter("priceFormatter", priceFilter);
        return lv;
    }

    function createWrapper () {
        return shallowMount(ViewFuelDetail, {
            localVue,
            propsData: {
                transaction: transactionData.data
            },
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        wrapper = createWrapper();
    });

    test("total Price must equal 13500", () => {
        expect(wrapper.vm.totalPrice).toBe(13500);
    });
});
