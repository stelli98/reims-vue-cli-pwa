import { shallowMount, createLocalVue } from "@vue/test-utils";
import ParkingForm from "@/components/ParkingForm";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";

describe("ParkingForm.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const ParkingData = {
        "id": 500000026,
        "image": "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
        "location": "Graha Niaga Thamrin",
        "title": "Graha Niaga Thamrin",
        "category": "PARKING",
        "license": "BL 6728 POW",
        "type": "Motorcycle",
        "date": "2018-05-12T17:19:06.151Z",
        "amount": 9000,
        "created_at": "01:12:2007 03:06:10z",
        "modified_at": "",
    }

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
            parking: ParkingData
        };
        const getters = {
            parking: state => state.parking
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
        return shallowMount(ParkingForm, {
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

    test("reformat convertDateToEpoch", () => {
        wrapper.vm.parking.date = "2019-08-13T10:26:49.000Z"
        wrapper.vm.convertDateToEpoch();
        expect(wrapper.vm.parking.date).toBe(1565692009000);
    });

    test("methods toggle", () => {
        wrapper.vm.toggle();
        expect(wrapper.vm.isSwitchOn).toBe(false);
    });

    test("methods reformatPrice", () => {
        wrapper.vm.reformatPrice();
        expect(wrapper.vm.parking.amount).toBe(9000);
    });

    test("methods calculateDuration", () => {
        wrapper.vm.parking.out = "2019-08-13T11:27:50.000Z"
        wrapper.vm.calculateDuration();
        expect(wrapper.vm.parking.hours).toBe(2);
    });

    test("sendParkingForm method", () => {
        // store.state.transaction.fuel = {
        //     id: 500000026,
        //     title: "Test 1",
        //     image:
        //         "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
        //     category: "FUEL",
        //     date: "2018-05-12T17:19:06.151Z",
        //     type: "Premium",
        //     liters: "5.0",
        //     amount: 9000,
        //     created_at: "2018-05-12T17:19:06.151Z",
        //     modified_at: ""
        // }

        // wrapper.vm.reformatVolume = jest.fn()
        // const spyFormatVolume = jest.spyOn(wrapper.vm, 'reformatVolume')
        // const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, 'convertDateToEpoch')
        // const spySaveTransactions = jest.spyOn(store.actions.transaction, 'saveTransaction')
        // wrapper.vm.sendParkingForm();
        // expect(wrapper.vm.reformatVolume).toHaveBeenCalled();
        // expect(spyConvertDateToEpoch).toHaveBeenCalled();
        // expect(spySaveTransactions).toHaveBeenCalled();
    });

    test("formatInDate computed", () => {
        wrapper.setData({ formatInDate: 1565419259000 })
        expect(wrapper.vm.formatInDate).toBe("2019-08-10T06:40:59.000Z")
    })

    test("formatOutDate computed", () => {
        wrapper.setData({ formatOutDate: 1565695670000 })
        expect(wrapper.vm.formatOutDate).toBe("2019-08-13T11:27:50.000Z")
    })

    test("parkingAmount computed setter getter", () => {
        wrapper.setData({ parkingAmount: 20000 })
        expect(wrapper.vm.parkingAmount).toBe("20.000")
    })
});
