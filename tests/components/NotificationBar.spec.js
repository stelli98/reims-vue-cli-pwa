import { shallowMount, createLocalVue } from "@vue/test-utils";
import NotificationBar from "@/components/NotificationBar.vue";
import Vuex from "vuex";

describe('NotificationBar.vue', () => {
    let store;
    let wrapper;
    let localVue;
    const notificationsData = [
        {
            type: "success",
            message: "Image has been submitted."
        },
        {
            type: "error",
            message: "Oops ! error"
        }
    ]


    function initializeStore () {
        const actions = {
            removeNotification: jest.fn()
        }

        const store = new Vuex.Store({
            modules: {
                notification: {
                    actions,
                    namespaced: true
                }
            }
        })

        return {
            store,
            actions
        }
    }
    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(Vuex);
        return lv;
    }

    function createWrapper (store) {
        return shallowMount(NotificationBar, {
            store,
            localVue,
            propsData: {
                notification: notificationsData[1]
            },
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);
    });

    test('', () => {

    })

})