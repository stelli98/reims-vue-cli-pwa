import getters from "@/store/modules/transaction/getters";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
const expectedValue = data.find(
  d => d.url == url.transaction && d.method == "GET"
);
const expectedValueParking = data.find(d => d.url == url.transaction + "/1");
const expectedValueFuel = data.find(d => d.url == url.transaction + "/1");

describe("transaction getters", () => {
  test("Get transactions from transaction module", () => {
    const state = {
      transactions: expectedValue.data
    };
    const transactions = getters.transactions(state);
    expect(transactions).toBe(state.transactions);
  });

  test("Get transactions from transaction module", () => {
    const state = {
      transactions: undefined
    };
    const transactions = getters.transactions(state);
    expect(transactions).toEqual([]);
  });

  test("Get transaction from transaction module", () => {
    const state = {
      transaction: expectedValueParking.data
    };
    const transaction = getters.transaction(state);
    expect(transaction).toBe(state.transaction);
  });

  test("Get paginations from transaction module", () => {
    const state = {
      pagination: expectedValue.data.pagination
    };
    const pagination = getters.pagination(state);
    expect(pagination).toBe(state.pagination);
  });

  test("Get parking from parking module", () => {
    const state = {
      parking: expectedValueParking.data
    };
    const parking = getters.parking(state);
    expect(parking).toBe(state.parking);
  });

  test("Get fuel from fuel module", () => {
    const state = {
      fuel: expectedValueFuel.data
    };
    const fuel = getters.fuel(state);
    expect(fuel).toBe(state.fuel);
  });

  test("Get image from image module", () => {
    const state = {
      image: "image.jpg"
    };
    const image = getters.image(state);
    expect(image).toBe(state.image);
  });


  test("Get images from images module", () => {
    const state = {
      images: ["image.jpg"]
    };
    const images = getters.images(state);
    expect(images).toBe(state.images);
  });

  test("Get viewImage from image module", () => {
    const expectedValue = data.find(
      d => d.url == url.transaction + "/3278/12345abc"
    );
    const state = {
      viewImage: expectedValue.data
    };
    const viewImage = getters.viewImage(state);
    expect(viewImage).toBe(state.viewImage);
  });
});
