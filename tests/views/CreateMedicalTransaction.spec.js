import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateMedicalTransaction from "@/views/CreateMedicalTransaction";
import Vuex from "vuex";
import Vuelidate from "vuelidate";
import textFilter from "@/filters/text";
import data from "@/api-mock/mock-data";
import config from "@/config";
const url = config.api.users;

describe("CreateMedicalTransaction.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const userFamilyData = data.find(
    d => d.url == url.family + "?user-id=1559058600" && d.method == "GET"
  );

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const auth = initializeAuthStore();
    const user = initializeUserStore();
    const store = new Vuex.Store({
      modules: {
        transaction,
        auth,
        user
      }
    });

    return {
      store,
      state: {
        transaction: transaction.state,
        auth: auth.state,
        user: user.state
      },
      actions: {
        transaction: transaction.actions,
        user: user.actions
      },
      getters: {
        transaction: transaction.getters,
        auth: auth.getters,
        user: user.getters
      }
    };
  }

  function initializeAuthStore() {
    const state = {
      id: "1559058600"
    };
    const getters = {
      id: state => state.id
    };
    const namespaced = true;
    return { state, getters, namespaced };
  }

  function initializeUserStore() {
    const state = {
      userFamily: userFamilyData.data
    };
    const getters = {
      userFamily: state => state.userFamily
    };
    const actions = {
      getUserFamilyDetail: jest.fn()
    };
    const namespaced = true;
    return { state, getters, actions, namespaced };
  }

  function initializeTransactionStore() {
    const state = {
      images: ["image1.jpg", "image2.jpg"]
    };
    const getters = {
      images: state => state.images
    };
    const actions = {
      createMedicalTransaction: jest.fn()
    };
    const namespaced = true;
    return { state, actions, getters, namespaced };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.use(Vuelidate);
    lv.filter("textFormatter", textFilter);
    return lv;
  }

  function createWrapper(store) {
    return shallowMount(CreateMedicalTransaction, {
      store,
      localVue,
      stubs: ["Datetime", "Carousel", "Slide"],
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
    // wrapper = createWrapper(store.store);
    // console.log(wrapper.vm);
  });

  test("medicalAmount computed setter getter", () => {
    wrapper = createWrapper(store.store);
    wrapper.setData({ medicalAmount: 20000 });
    expect(wrapper.vm.medicalAmount).toBe("20.000");
  });

  test("reformat convertDateToEpoch", () => {
    wrapper.vm.medical.date = "2019-08-13T10:26:49.000Z";
    wrapper.vm.convertDateToEpoch();
    expect(wrapper.vm.medical.date).toBe(1565692009000);
  });

  test("formaDate computed", () => {
    wrapper.setData({ formatDate: 1565695670000 });
    expect(wrapper.vm.formatDate).toBe("2019-08-13T11:27:50.000Z");
  });

  test("moveTo", () => {
    const options = {
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    };
    wrapper = createWrapper(store.store, options);
    const spy = jest.spyOn(wrapper.vm.$router, "push");
    wrapper.vm.moveTo();
    expect(spy).toHaveBeenCalled();
  });
});
