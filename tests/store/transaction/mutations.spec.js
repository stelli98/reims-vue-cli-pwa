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

  test("SET_OCR_RESULT_TYPE sets state.OCRResultType", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "POST"
    );
    const state = {
      OCRResultType: ""
    };
    mutations.SET_OCR_RESULT_TYPE(state, expectedValue.data.category);
    expect(state.OCRResultType).toBe(expectedValue.data.category);
  });

  test("ADD_IMAGE_FUEL sets state.fuel.image", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "POST"
    );
    const state = {
      fuel: {
        image: ""
      }
    };
    mutations.ADD_IMAGE_FUEL(state, expectedValue.data.image);
    expect(state.fuel.image).toBe(expectedValue.data.image);
  });

  test("ADD_IMAGE_PARKING sets state.parking.image", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method === "POST"
    );
    const state = {
      parking: {
        image: ""
      }
    };
    mutations.ADD_IMAGE_PARKING(state, expectedValue.data.image);
    expect(state.parking.image).toBe(expectedValue.data.image);
  });

  test("ADD_USER_ID_FUEL sets state.parking.image", () => {
    const expectedValue = 123;
    const state = {
      fuel: {
        userId: ""
      }
    };
    mutations.ADD_USER_ID_FUEL(state, expectedValue);
    expect(state.fuel.userId).toBe(expectedValue);
  });

  test("ADD_USER_ID_PARKING sets state.parking.image", () => {
    const expectedValue = 123;
    const state = {
      parking: {
        userId: ""
      }
    };
    mutations.ADD_USER_ID_PARKING(state, expectedValue);
    expect(state.parking.userId).toBe(expectedValue);
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

  test("DELETE_TRANSACTION remove deleted id from state.transactions", () => {
    const initialValue = data.find(
      d => d.url === url.transaction && d.method === "GET"
    );
    const state = {
      transactions: initialValue.data
    };
    const expectedValue = initialValue.data.filter(data => data.id !== 1);
    mutations.DELETE_TRANSACTION(state, 1);
    expect(state.transactions).toEqual(expectedValue);
  });

  test("SET_VIEW_IMAGE set image from state.viewImage", () => {
    const expectedValue = data.find(
      d => d.url === url.transaction + "/3278/12345abc" && d.method === "GET"
    );
    const state = {
      viewImage: ""
    };
    mutations.SET_VIEW_IMAGE(state, expectedValue);
    expect(state.viewImage).toEqual(expectedValue.data);
  });
});
