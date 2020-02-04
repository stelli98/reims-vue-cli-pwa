import { shallowMount, createLocalVue } from "@vue/test-utils";
import ParkingForm from "@/components/user/ParkingForm";
import TextFilter from "@/filters/text";
import Vuelidate from "vuelidate";
import Vuex from "vuex";
import Vue from "vue";

describe("ParkingForm.vue", () => {
  let store;
  let wrapper;
  let localVue;

  const ParkingData = {
    id: 500000026,
    image:
      "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
    location: "Graha Niaga Thamrin",
    title: "Graha Niaga Thamrin",
    category: "PARKING",
    license: "BL 6728 POW",
    type: "Motorcycle",
    date: "2018-05-12T17:19:06.151Z",
    amount: 9000,
    created_at: "01:12:2007 03:06:10z",
    modified_at: ""
  };

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
      parking: ParkingData
    };
    const getters = {
      parking: state => state.parking
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
    return shallowMount(ParkingForm, mergeConfig);
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    wrapper = createWrapper(store.store);
  });

  test("reformat convertDateToEpoch", () => {
    wrapper.vm.parking.date = "2019-08-13T10:26:49.000Z";
    wrapper.vm.convertDateToEpoch();
    expect(wrapper.vm.parking.date).toBe(1565692009000);
  });

  test("methods reformatPrice", () => {
    wrapper.vm.reformatPrice();
    expect(wrapper.vm.parking.amount).toBe(9000);
  });

  test("formaDate computed", () => {
    wrapper.setData({ formatDate: 1565695670000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-13T11:27:50.000Z");
  });

  test("parkingAmount computed setter getter", () => {
    wrapper.setData({ parkingAmount: 20000 });
    expect(wrapper.vm.parkingAmount).toBe("20.000");
  });

  test("amountInt computed", () => {
    wrapper.vm.parking.amount = "2.000"
    expect(wrapper.vm.amountInt).toBe(2000)
  });

  test("sendParkingForm Method is succeeded", async ()=>{
    const options = {
      mocks : {
        $router : {
          push: jest.fn()
        }
      }
    }
    wrapper = createWrapper(store.store, options)
    store.state.transaction.parking = {
      category: "PARKING",
      date: "2018-05-12T17:19:06.151Z",
      amount: 100,
      title: "Title",
      image: "image.jpg",
      location: "Thamrin"
    }
    const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, "convertDateToEpoch");
    const spySaveTransaction = jest.spyOn(store.actions.transaction, "saveTransaction")
    const spyAddNotification = jest.spyOn(store.actions.notification, "addNotification")
    const spySetFormEmpty = jest.spyOn(wrapper.vm , "setFormEmpty")
    await wrapper.vm.sendParkingForm()
    wrapper.vm.$nextTick(()=>{
      expect(spyConvertDateToEpoch).toHaveBeenCalled()
      expect(spySaveTransaction).toHaveBeenCalled()
      expect(spyAddNotification).toHaveBeenCalled()
      expect(spySetFormEmpty).toHaveBeenCalled()
    })
  });

  test("sendParkingForm Method is failed", async ()=>{
    const options = {
      mocks : {
        $router : {
          push: jest.fn()
        }
      }
    }
    wrapper = createWrapper(store.store, options)
    store.state.transaction.parking = {
      category: "PARKING",
      date: "2018-05-12T17:19:06.151Z",
      amount: 100,
      title: "Title",
      image: "image.jpg",
      location: "Thamrin"
    }
    store.actions.transaction.saveTransaction.mockRejectedValue(() =>
      Promise.reject()
    );

    const spyConvertDateToEpoch = jest.spyOn(wrapper.vm, "convertDateToEpoch");
    const spySaveTransaction = jest.spyOn(store.actions.transaction, "saveTransaction")
    const spyAddNotification = jest.spyOn(store.actions.notification, "addNotification")
    const spySetFormEmpty = jest.spyOn(wrapper.vm , "setFormEmpty")
   
    try{
      await wrapper.vm.sendParkingForm() 
    }catch{
      wrapper.vm.$nextTick(()=>{
        expect(spyConvertDateToEpoch).toHaveBeenCalled()
        expect(spySaveTransaction).toHaveBeenCalled()
        expect(spyAddNotification).toHaveBeenCalled()
        expect(spySetFormEmpty).toHaveBeenCalled()
      })
    }
  })

});
