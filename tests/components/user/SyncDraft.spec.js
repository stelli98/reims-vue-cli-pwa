import { shallowMount, createLocalVue } from "@vue/test-utils";
import SyncDraft from "@/views/user/SyncDraft";
import offlineService from "@/api/transaction-offline";
jest.mock("@/api/transaction-offline");

describe("SyncDraft.vue", () => {
  let wrapper;
  let localVue;

  function generateLocalVue() {
    const lv = createLocalVue();
    return lv;
  }

  function createWrapper() {
    return shallowMount(SyncDraft, {
      localVue,
      stubs: ["CommonMixins", "GlobalHeader", "SyncDraftCard"],
      data() {
        return {
          transactions: [
            {
              title: "Medical 1",
              price: 100,
              category: "MEDICAL",
              date: Date.now()
            }
          ]
        };
      },
      sync: false
    });
  }

  beforeEach(() => {
    localVue = generateLocalVue();
    wrapper = createWrapper();
  });

  test("getAllUnSyncTransaction method", async () => {
    const medicalData = [
      {
        title: "Medical 1",
        price: 100,
        category: "MEDICAL",
        date: Date.now()
      },
      {
        title: "Medical 2",
        price: 200,
        category: "MEDICAL",
        date: Date.now()
      }
    ];
    const ocrData = [
      {
        title: "OCR 1",
        price: 100,
        category: "FUEL",
        date: Date.now()
      },
      {
        title: "OCR 2",
        price: 200,
        category: "PARKING",
        date: Date.now()
      }
    ];
    offlineService.getMedicalData = jest.fn().mockResolvedValue(medicalData);
    offlineService.getAllDataFromIndexedDB = jest
      .fn()
      .mockResolvedValue(ocrData);
    const result = [];
    const expectedResult = result.concat(medicalData, ocrData);
    await wrapper.vm.getAllUnSyncTransaction();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.transactions).toStrictEqual(expectedResult);
    });
  });
});
