import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserFamilyDetail from "@/components/UserFamilyDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import Vuex from "vuex";
import VueRouter from "vue-router";
import data from "@/api-mock/mock-data";
import config from "@/config";

let url = config.api.users;
let routes = []
describe("UserFamilyDetail.vue", async ()=>{
    let store;
    let localVue;
    let wrapper;
    const UserFamilydata = data.find(
        d => d.url == url.user + "/1559058600/family-members" && d.method=="GET"
      );

    function initializeStore() {
        const state = {
            userFamily: UserFamilydata.data
        };
        const actions = {
          getUserFamilyDetail: jest.fn()
        };
        const getters = {
            userFamily: state => state.userFamily
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
        return shallowMount(UserFamilyDetail, {
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
        const spy = jest.spyOn(store.actions, "getUserFamilyDetail")
        wrapper = createWrapper(store.store);
        expect(spy).toHaveBeenCalled()
    })

    test("isExpandedGroup method is included in expanded index", ()=>{
      wrapper.vm.expandedGroup = [2]
      expect(wrapper.vm.isExpandedGroup(3)).toEqual(false)
    })

    test("isExpandedGroup method isn't included in expanded index", ()=>{
      wrapper.vm.expandedGroup = [2]
      expect(wrapper.vm.isExpandedGroup(2)).toEqual(true)
    })

    test("toggleExpandFamilyData method if data is already expanded", ()=>{
      wrapper.vm.expandedGroup = [2,3]
      wrapper.vm.toggleExpandFamilyData(2)
      expect(wrapper.vm.expandedGroup.indexOf(2)).toEqual(-1)
    })

    test("toggleExpandFamilyData method if data haven't expand", ()=>{
      wrapper.vm.expandedGroup = [3]
      wrapper.vm.toggleExpandFamilyData(2)
      expect(wrapper.vm.expandedGroup.indexOf(2)).toEqual(1)
    })
})