import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserPersonalDetail from "@/components/UserPersonalDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

let url = config.api.users;
let routes = []
describe("UserPersonalDetail.vue", async ()=>{
    let store;
    let localVue;
    let wrapper;
    const userPersonalData = data.find(
        d => d.url == url.user + "/1559058600" && d.method=="GET"
      );

    function initializeStore() {
        const state = {
            user: userPersonalData.data
        };
        const actions = {
          getUser: jest.fn()
        };
        const getters = {
          user: state => state.user
        };
        const store = new Vuex.Store({
          modules: {
            user: {
              state,
              getters,
              actions,
              namespaced: true
            }
          }
        });
    
        return {
          store,
          state,
          getters,
          actions
        };
    }

    function generateLocalVue(){
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.use(VueRouter);
        lv.filter("textFormatter", TextFilter);
        lv.filter("dateFormatter", dateFilter);
        return lv;
    }

    function createWrapper(store){
        const router = new VueRouter({routes})
        return shallowMount(UserPersonalDetail, {
            store, 
            localVue, 
            router,
            sync: false
        })
    }
    
    beforeEach(()=>{
        localVue = generateLocalVue();
        store = initializeStore();
    })

    test('Get userId from url param', () => {
        wrapper = createWrapper(store.store);
        const params = {
          id: '1559058600'
        }
        wrapper.vm.$router.push({params})
        expect(wrapper.vm.userId).toBe(wrapper.vm.$route.params.id)
      })

    test("mounted called getUser actions", ()=>{
        const spyGetUserAction = jest.spyOn(store.actions, "getUser")
        wrapper = createWrapper(store.store);
        expect(spyGetUserAction).toHaveBeenCalled()
    })
})