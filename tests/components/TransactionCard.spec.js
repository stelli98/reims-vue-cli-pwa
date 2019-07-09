import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionCard from "@/components/TransactionCard";
import trimTextFilter from "@/filters/trimText";
import dateFilter from "@/filters/date";
import priceFilter from "@/filters/price";
import textFilter from "@/filters/text";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

const routes = [];

describe("TransactionCard.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const transactionData = data.find(d =>
        d.url === url.transaction
    );

    function initializeStore () {
        const actions = {
            deleteTransaction: jest.fn()
        };

        const store = new Vuex.Store({
            modules: {
                transaction: {
                    actions,
                    namespaced: true
                }
            }
        });

        return {
            store,
            actions
        };
    }

    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.filter("trimTextFormatter", trimTextFilter);
        lv.filter("dateFormatter", dateFilter);
        lv.filter("priceFormatter", priceFilter);
        lv.filter("textFormatter", textFilter);
        return lv;
    }

    function createWrapper (store, mock) {
        return shallowMount(TransactionCard, {
            store,
            localVue,
            propsData: {
                transaction: transactionData.data[1]
            },
            stubs: ['router-link'],
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);
    });

    test("Transaction Title must be shorten from Bensin PP Thamrin - GI to be Bensin PP Thamrin - ...", () => {
        expect(wrapper.vm.transactionTitle).toBe("Bensin PP Thamrin - ...");
    });

    test("Should be calling deleteTransaction actions", () => {
        const spy = jest.spyOn(store.actions, 'deleteTransaction')
        const transactionId = 1
        wrapper.vm.removeTransaction(transactionId)
        expect(spy).toHaveBeenCalled()
    });
});
