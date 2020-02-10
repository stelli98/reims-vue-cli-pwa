import { shallowMount, createLocalVue } from "@vue/test-utils";
import TransactionDetail from "@/views/user/TransactionDetail";
import TextFilter from "@/filters/text";
import dateFilter from "@/filters/date";
import priceFilter from "@/filters/price";
import Vuex from "vuex";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

describe("TransactionDetail.vue", () => {
  let store;
  let wrapper;
  let localVue;
  const transactionData = data.find(d => d.url === url.medical + "/14");
  const response = {
    data: {
      code: 200,
      data: "image1.jpg"
    }
  };

  function initializeStore() {
    const transaction = initializeTransactionStore();
    const user = initializeUserStore();

    const store = new Vuex.Store({
      modules: {
        user,
        transaction
      }
    });

    return {
      store,
      state: {
        transaction: transaction.state
      },
      actions: {
        transaction: transaction.actions,
        user: user.actions
      },
      getters: {
        transaction: transaction.getters
      }
    };
  }

  function initializeTransactionStore() {
    const actions = {
      getTransactionByCategory: jest.fn()
    };

    const getters = {
      transaction: state => state.transaction
    };

    const state = {
      transaction: transactionData.data
    };
    const namespaced = true;
    return { actions, state, getters, namespaced };
  }

  function initializeUserStore() {
    const actions = {
      getViewImage: jest.fn()
    };
    const namespaced = true;
    return {
      actions,
      namespaced
    };
  }

  function generateLocalVue() {
    const lv = createLocalVue();
    lv.use(Vuex);
    lv.filter("textFormatter", TextFilter);
    lv.filter("dateFormatter", dateFilter);
    lv.filter("priceFormatter", priceFilter);
    return lv;
  }

  function createWrapper(store) {
    return shallowMount(TransactionDetail, {
      store,
      localVue,
      stubs: [
        "ViewParkingDetail",
        "ViewFuelDetail",
        "ViewMedicalDetail",
        "GlobalHeader"
      ],
      sync: false,
      mocks: {
        $router: {
          push: jest.fn()
        },
        $route: {
          query: {
            category: "MEDICAL"
          },
          params: {
            id: 1
          }
        }
      }
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    store = initializeStore();
  });

  test("transactionCategory must be Medical", () => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getImageList = jest
      .fn()
      .mockResolvedValue(Promise.resolve(response));
    expect(wrapper.vm.transactionCategory).toBe("Medical");
  });

  test("activeComponent must be ViewMedicalDetail", () => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getImageList = jest
      .fn()
      .mockResolvedValue(Promise.resolve(response));
    expect(wrapper.vm.activeComponent).toBe("ViewMedicalDetail");
  });

  test("imagePath method", () => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getImageList = jest
      .fn()
      .mockResolvedValue(Promise.resolve(response));
    const image = "iv9B0123";
    expect(wrapper.vm.imagePath(image)).toBe(`data:image/png;base64,${image}`);
  });

  test("get Image List", async () => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getViewImage = jest.fn().mockResolvedValue(response);
    wrapper.vm.checkStatus = jest.fn().mockResolvedValue(response);
    await wrapper.vm.getImageList();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.getViewImage).toHaveBeenCalled();
      expect(wrapper.vm.checkStatus).toHaveBeenCalled();
    });
  });

  test("checkStatus method success", () => {
    wrapper = createWrapper(store.store);
    wrapper.vm.getImageList = jest
      .fn()
      .mockResolvedValue(Promise.resolve(response));
    expect(wrapper.vm.checkStatus(response)).toEqual(
      Promise.resolve(response.data.data)
    );
  });

  test("checkStatus method error", () => {
    response.data.code = 500;
    wrapper = createWrapper(store.store);
    wrapper.vm.getImageList = jest
      .fn()
      .mockResolvedValue(Promise.resolve(response));
    expect(wrapper.vm.checkStatus(response)).toEqual(
      Promise.reject(new Error("Error"))
    );
  });
});
