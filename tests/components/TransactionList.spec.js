import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionList from "@/components/TransactionList.vue";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
describe('TransactionList.vue', () => {
    let wrapper;
    let localVue;
    const transactionData = data.find(d =>
        d.url === url.transaction && d.params.page == 1
    );

    function generateLocalVue () {
        const lv = createLocalVue();
        return lv;
    }

    function createWrapper () {
        return shallowMount(TransactionList, {
            localVue,
            stubs: ["TransactionCard"],
            propsData: {
                transactions: transactionData.data
            }
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        wrapper = createWrapper();
    });

    test('Emit openFilter', () => {
        wrapper.vm.openFilter()
        expect(wrapper.emitted().openFilter).toEqual([[true]])
    })

    test('Emit updateTransactions', () => {
        wrapper.vm.updateTransactions()
        expect(wrapper.emitted().updateTransactions).toEqual([[]])
    })
})