import { shallowMount, createLocalVue } from "@vue/test-utils";
import LoginPage from "@/views/LoginPage";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.auth;

const routes = [
    {
        path: "/users",
        name: "user"
    },
    {
        path: "/home",
        name: "home",
    }
];


describe("LoginPage.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const userData = data.find(d =>
        d.url === url.login && d.method == "POST"
    );

    function initializeStore () {
        const actions = {
            login: jest.fn()
        };

        const state = {
            role: userData.data.role
        };

        const getters = {
            role: (state) => state.role
        }

        const store = new Vuex.Store({
            modules: {
                auth: {
                    actions,
                    state,
                    getters,
                    namespaced: true
                }
            }
        });

        return {
            store,
            state,
            actions,
            getters
        };
    }

    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.use(VueRouter);
        lv.use(Vuelidate);
        return lv;
    }

    function createWrapper (store) {
        const router = new VueRouter({ routes });
        return shallowMount(LoginPage, {
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

    test("submitLoginForm should call the login action and change the route", () => {
        wrapper.vm.user = {
            username: "Hefriza Munaf",
            password: "1234567"
        }
        wrapper.vm.access = {
            ADMIN: "user",
            USER: "home"
        }
        const spy = jest.spyOn(store.actions, 'login')
        wrapper.vm.submitLoginForm()
        expect(spy).toHaveBeenCalled()
        // expect(wrapper.vm.$rcoute.path).toBe('/users');
    });

});