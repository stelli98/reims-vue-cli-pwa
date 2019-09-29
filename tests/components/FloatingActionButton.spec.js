import { shallowMount, createLocalVue} from "@vue/test-utils";
import FloatingActionButton from "@/components/FloatingActionButton";
import Vuex from "vuex";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/transaction/create/1", 
        name: "create-transaction-1"
    }
]

describe("FloatingActionButton.vue", () => {
    let store;
    let wrapper;
    let localVue;

    function initializeStore() {
        const actions = {
          setImage: jest.fn()
        };
    
        const store = new Vuex.Store({
          modules: {
            transaction: {
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
    
      function generateLocalVue() {
        const lv = createLocalVue();
        lv.use(Vuex);
        lv.use(VueRouter);
        return lv;
      }
    
      function createWrapper(store) {
        const router = new VueRouter({ routes });
        return shallowMount(FloatingActionButton, {
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
    

  test("methods onFileChange", () => {
    global.URL.createObjectURL = jest.fn();
    const spy = jest.spyOn(store.actions, "setImage");
    const e = {
      target: {
        files: ["image.jpg"]
      }
    };
    wrapper.vm.onFileChange(e);
    expect(spy).toHaveBeenCalled();
  });

  test("toggleDisplayMenu before it's clicked",()=>{
      expect(wrapper.vm.displayMenu).toEqual(false)
  })

  test("toggleDisplayMenu after it's clicked",()=>{
    wrapper.vm.toggleDisplayMenu()
    expect(wrapper.vm.displayMenu).toEqual(true)
  })

})