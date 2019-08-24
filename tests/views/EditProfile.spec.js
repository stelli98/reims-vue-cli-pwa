import { shallowMount, createLocalVue } from "@vue/test-utils";
import EditProfile from "@/views/EditProfile";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/users/edit-profile",
        name: "edit-profile"
    },
    {
        path: "/home",
        name: "home"
    }
];

describe("EditProfile.vue", () => {
    let store;
    let wrapper;
    let localVue;
    let response = {
        headers: {
            authorization: 'Bearer 321'
        }
    }
    function initializeStore () {
        const auth = initializeAuthStore();
        const user = initializeUserStore();
        const store = new Vuex.Store({
            modules: {
                auth,
                user
            }
        });

        return {
            store,
            state: {
                auth: auth.state
            },
            actions: {
                auth: auth.actions,
                user: user.actions
            },
            getters: {
                auth: auth.getters
            }
        };
    }

    function initializeAuthStore () {
        const state = {
            username: "stelli"
        };
        const getters = {
            username: state => state.username
        }
        const actions = {
            updateToken: jest.fn()
        };
        const namespaced = true;
        return { state, getters, actions, namespaced };
    }

    function initializeUserStore () {
        const actions = {
            updatePersonalProfile: jest.fn().mockResolvedValue(Promise.resolve(response))
        };
        const namespaced = true;
        return { actions, namespaced };
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
        return shallowMount(EditProfile, {
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

    test("methods moveTo", () => {
        wrapper.vm.moveTo();
        expect(wrapper.vm.$route.path).toBe("/home");
    });

    test("submitForm should call the updatePersonalProfile and updatePersonalProfile action", async () => {
        wrapper.vm.user = {
            username: "Hefriza Munaf",
            password: "1234567"
        };
        const spyUpdatePersonalProfile = jest.spyOn(store.actions.user, "updatePersonalProfile");
        await wrapper.vm.submitForm();
        expect(spyUpdatePersonalProfile).toHaveBeenCalled();
    });
});
