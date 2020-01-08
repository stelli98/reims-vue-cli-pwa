import { shallowMount, createLocalVue } from "@vue/test-utils";
import FuelForm from "@/components/user/FuelForm";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";
import Vue from 'vue';

const url = config.api.transactions;

describe("FuelForm.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const fuelData = data.find(
    d => d.url === url.transaction && d.method === "POST"
  );

  function initializeStore() {
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

  function initializeTransactionStore() {
    const state = {
      fuel: fuelData.data
    };
    const getters = {
      fuel: state => state.fuel
    };
    const actions = {
      saveTransaction: jest.fn(),
      setFormEmpty: jest.fn()
    };
    const namespaced = true;
    return { state, getters, actions, namespaced };
  }

  function initializeNotificationStore() {
    const actions = {
      addNotification: jest.fn()
    };
    const namespaced = true;
    return { actions, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(Vuelidate);
    lv.filter("textFormatter", TextFilter);
    return lv;
  }

  function createWrapper(store, options) {
    const defaultConfig = {
      store,
      localVue,
      propsData:{
        bus: new Vue()
      },
      stubs: ["Datetime"],
      sync: false
    }
    const mergeConfig = {...options, ...defaultConfig}
    return shallowMount(FuelForm,mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("reformat convertDateToEpoch", () => {

    wrapper.vm.fuel.date = "2019-08-13T10:26:49.000Z";
    wrapper.vm.convertDateToEpoch();
    expect(wrapper.vm.fuel.date).toBe(1565692009000);
  });

  test("fuelAmount computed setter getter", () => {
    wrapper.setData({ fuelAmount: 20000 });
    expect(wrapper.vm.fuelAmount).toBe("20.000");
  });

  test("formatDate computed setter getter", () => {
    wrapper.setData({ formatDate: 1565419259000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-10T06:40:59.000Z");
  });

  test("fuelTemplate computed", ()=>{
    const expectedValue = {
      data: {
        category: "FUEL",
        date: "",
        fuelType: "",
        kilometer: 1,
        amount: 100,
        title: "",
        userId: "",
        image: ""
      }
    }
    expect(wrapper.vm.fuelTemplate).toEqual(expectedValue)
  })

  test("sendFuelForm Method is succeeded", async ()=>{
    const options = {
      mocks : {
        $router : {
          push: jest.fn()
        }
      }
    }
    wrapper = createWrapper(store.store, options)
    store.state.transaction.fuel = {
      category: "FUEL",
      date: 123,
      fuelType: "A",
      kilometer: 1,
      amount: 100,
      title: "AA"
    }
    const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, "convertDateToEpoch");
    const spySaveTransaction = jest.spyOn(store.actions.transaction, "saveTransaction")
    const spyAddNotification = jest.spyOn(store.actions.notification, "addNotification")
    const spySetFormEmpty = jest.spyOn(wrapper.vm , "setFormEmpty")
    await wrapper.vm.sendFuelForm()
    wrapper.vm.$nextTick(()=>{
      expect(spyConvertDateToEpoch).toHaveBeenCalled()
      expect(spySaveTransaction).toHaveBeenCalled()
      expect(spyAddNotification).toHaveBeenCalled()
      expect(spySetFormEmpty).toHaveBeenCalled()
    })
  })

  test("sendFuelForm Method is failed", async ()=>{
    const options = {
      mocks : {
        $router : {
          push: jest.fn()
        }
      }
    }
    wrapper = createWrapper(store.store, options)
    store.state.transaction.fuel = {
      category: "FUEL",
      date: 123,
      fuelType: "A",
      kilometer: 1,
      amount: 100,
      title: "AA"
    }
    store.actions.transaction.saveTransaction.mockRejectedValue(() =>
      Promise.reject()
    );

    const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, "convertDateToEpoch");
    const spySaveTransaction = jest.spyOn(store.actions.transaction, "saveTransaction")
    const spyAddNotification = jest.spyOn(store.actions.notification, "addNotification")
    const spySetFormEmpty = jest.spyOn(wrapper.vm , "setFormEmpty")
   
    try{
      await wrapper.vm.sendFuelForm() 
    }catch{
      wrapper.vm.$nextTick(()=>{
        expect(spyConvertDateToEpoch).toHaveBeenCalled()
        expect(spySaveTransaction).toHaveBeenCalled()
        expect(spyAddNotification).toHaveBeenCalled()
        expect(spySetFormEmpty).toHaveBeenCalled()
      })
    }
  })

  test("formatAmount int if fuel.amount is not empty", ()=>{
    const options = {
      computed : {
        amountInt () {
          return 20000
        }
      }
    }
    wrapper = createWrapper(store.store, options)
    expect(wrapper.vm.formatAmountToInt).toEqual(20000)
  })

  test("formatAmount int if fuel.amount is empty return string", ()=>{
    store.state.transaction.fuel.amount= ""
    expect(wrapper.vm.formatAmountToInt).toEqual("")
  })


});
