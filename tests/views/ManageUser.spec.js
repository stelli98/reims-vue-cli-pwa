import { shallowMount, createLocalVue } from "@vue/test-utils";
import ManageUser from "@/views/ManageUser.vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.users;
const routes = [
    {
        path: "/login",
        name: "login"
    },
    {
        path: "/users",
        name: "user",
    },
    {
        path: "/users/create",
        name: "user-create",
    },
    {
        path: "/home",
        name: "home",
    }
];

describe("ManageUser.vue", () => {
    let store;
    let wrapper;
    let localVue;
    const userData = data.find(d =>
        d.url === url.user && d.method == "GET" && d.params.page == 1
    );

    function initializeStore () {

        const user = initializeUserStore()
        const auth = initializeAuthStore()
        const store = new Vuex.Store({
            modules: {
                user,
                auth
            }
        });

        return {
            store,
            state: {
                user: user.state
            },
            actions: {
                user: user.actions,
                auth: auth.actions
            },
            getters: {
                user: user.getters
            }
        };
    }


    function initializeAuthStore () {
        const actions = {
            logout: jest.fn()
        }
        const namespaced = true
        return { actions, namespaced }

    }

    function initializeUserStore () {
        const actions = {
            getUsers: jest.fn()
        }
        const state = {
            users: userData.data,
            pagination: userData.data.page
        }
        const getters = {
            users: (state) => state.users,
            pagination: (state) => state.pagination
        }
        const namespaced = true
        return { state, actions, getters, namespaced }
    }

    function generateLocalVue () {
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.use(VueRouter);
        return lv;
    }

    function createWrapper (store) {
        const router = new VueRouter({ routes });
        return shallowMount(ManageUser, {
            store,
            localVue,
            router,
            stubs: ["UserList", "Pagination"],
            sync: false
        });
    }

    beforeEach(() => {
        localVue = generateLocalVue();
        store = initializeStore();
        wrapper = createWrapper(store.store);
    });

    test("methods moveTo", () => {
        wrapper.vm.moveTo();
        expect(wrapper.vm.$route.path).toBe("/users/create");
    })

    test("methods changePage", () => {
        const spy = jest.spyOn(store.actions.user, 'getUsers')
        wrapper.vm.changePage(2);
        expect(wrapper.vm.$route.query.page).toBe(2);
        expect(spy).toHaveBeenCalled();
    })

    test("methods submitSearch", () => {
        const spy = jest.spyOn(store.actions.user, 'getUsers')
        const event = {
            target: {
                value: "Fuel"
            }
        }
        wrapper.vm.submitSearch(event);
        expect(wrapper.vm.$route.query.search).toBe(event.target.value);
        expect(spy).toHaveBeenCalled();
    })

    test("methods doLogout", () => {
        const spy = jest.spyOn(store.actions.auth, 'logout')
        wrapper.vm.doLogout();
        expect(spy).toHaveBeenCalled();
    })


});
