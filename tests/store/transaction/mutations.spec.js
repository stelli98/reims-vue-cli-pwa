import mutations from "@/store/modules/transaction/mutations";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;

describe("mutations for transaction module", () => {
  test("SET_IMAGE sets state.image", () => {
    const expectedValue = "image.jpg";
    const state = {
      image: ""
    };
    mutations.SET_IMAGE(state, expectedValue);
    expect(state.image).toBe(expectedValue);
  });

  test("SET_IMAGES sets state.images", () => {
    const expectedValue = ["image.jpg"];
    const state = {
      images: []
    };
    mutations.SET_IMAGES(state, expectedValue);
    expect(state.images).toBe(expectedValue);
  });

  test("SET_OCR_RESULT sets state.fuel", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "POST"
    );
    const state = {
      fuel: {
        date: "",
        type: "",
        liters: 0,
        amount: 0,
        title: ""
      }
    };
    mutations.SET_OCR_RESULT(state, expectedValue);
    expect(state.fuel).toEqual(expectedValue.data);
  });

  test("SET_TRANSACTION sets state.transaction", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction + "/1" && d.method === "GET"
    );
    const state = {
      transaction: {}
    };
    mutations.SET_TRANSACTION(state, expectedValue);
    expect(state.transaction).toBe(expectedValue.data);
  });

  test("SET_TRANSACTIONS sets state.transactions", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "GET"
    );
    const state = {
      transactions: []
    };
    mutations.SET_TRANSACTIONS(state, expectedValue);
    expect(state.transactions).toBe(expectedValue.data);
  });

  test("SET_PAGINATION sets state.paginations", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "GET"
    );
    const state = {
      pagination: {}
    };
    mutations.SET_PAGINATION(state, expectedValue);
    expect(state.pagination).toBe(expectedValue.paging);
  });
});
