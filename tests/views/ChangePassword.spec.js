import { shallowMount, localVue, createLocalVue } from "@vue/test-utils";
import ChangePassword from "@/views/ChangePassword";
import Vuex from "vuex";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/home",
        name: "home"
    },
    {
        path: "/users/change-password",
        name: "change-password",
    }
]

describe("ChangePassword.vue", () => {
    let store;
    let wrapper;
    let localVue;

    function initializeStore () {
        const actions = {
            updateUser: jest.fn()
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
        lv.use(VueRouter);
        return lv;
    }

    function createWrapper (store) {
        const router = new VueRouter({ routes });
        return shallowMount(ChangePassword, {
            store,
            localVue,
            router,
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);
    });

    test("moveTo method", () => {
        wrapper.vm.moveTo();
        expect(wrapper.vm.$route.path).toBe("/home")
    })
})