import { shallowMount, createLocalVue } from "@vue/test-utils";
import FuelForm from "@/components/FuelForm";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;


describe("FuelForm.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const fuelData = data.find(
        d => d.url === url.transaction && d.method === "POST"
    );

    function initializeStore () {
        const transaction = initializeTransactionStore();
        const notification = initializeNotificationStore();
        const store = new Vuex.Store({
            modules: {
                transaction,
                notification
            }
        });

        return {
            store,
            state: {
                transaction: transaction.state
            },
            actions: {
                transaction: transaction.actions,
                notification: notification.actions
            },
            getters: {
                transaction: transaction.getters
            }
        };
    }

    function initializeTransactionStore () {
        const state = {
            fuel: fuelData.data
        };
        const getters = {
            fuel: state => state.fuel
        }
        const actions = {
            saveTransaction: jest.fn(),
            setFormEmpty: jest.fn()
        };
        const namespaced = true;
        return { state, getters, actions, namespaced };
    }

    function initializeNotificationStore () {
        const actions = {
            addNotification: jest.fn()
        };
        const namespaced = true;
        return { actions, namespaced };
    }

    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.use(Vuelidate);
        lv.filter("textFormatter", TextFilter);
        return lv;
    }

    function createWrapper (store) {
        return shallowMount(FuelForm, {
            store,
            localVue,
            stubs: ["Datetime"],
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);

    });

    test("methods toggle", () => {
        wrapper.vm.toggle();
        expect(wrapper.vm.isSwitchOn).toBe(false);
    });

    test("reformat volume", () => {
        wrapper.vm.fuel.liters = "1.32"
        wrapper.vm.reformatVolume();
        expect(wrapper.vm.fuel.liters).toBe(1.32);
    });

    test("reformat convertDateToEpoch", () => {
        wrapper.vm.fuel.date = "2019-08-13T10:26:49.000Z"
        wrapper.vm.convertDateToEpoch();
        expect(wrapper.vm.fuel.date).toBe(1565692009000);
    });
});
