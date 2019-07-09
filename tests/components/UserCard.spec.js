import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserCard from "@/components/js/user-card.js";
import TrimTextFilter from "@/filters/trimText";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;

describe("UserCard.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const userData = data.find(d =>
        d.url === url.user
    );

    function initializeStore () {
        const actions = {
            deleteUser: jest.fn()
        };

        const store = new Vuex.Store({
            modules: {
                user: {
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
        lv.filter("trimTextFormatter", TrimTextFilter);
        return lv;
    }

    function createWrapper (store) {
        return shallowMount(UserCard, {
            store,
            localVue,
            propsData: {
                user: userData.data[1]
            }
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);
    });

    test("Username must be shorten from Munawan Sadakh to Munawan Sa...", () => {
        expect(wrapper.vm.userName).toBe("Munawan Sa...");
    });

    test("Should be calling deleteUser actions", () => {
        const spy = jest.spyOn(store.actions, 'deleteUser')
        const userId = 1
        wrapper.vm.removeUser(userId)
        expect(spy).toHaveBeenCalled()
    });
});
