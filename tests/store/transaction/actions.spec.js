import actions from "@/store/modules/transaction/actions";
import api from "@/api/transaction";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
const image = "image.jpg";
const id = 1;
const rootState = {
  auth: {
    token: "Bearer 123"
  }
};
jest.mock("@/api/transaction");

describe("Actions for Transactions Module", () => {
  test("set image for transaction", () => {
    const commit = jest.fn();
    actions.setImage({ commit }, image);
    expect(commit).toHaveBeenCalledWith("SET_IMAGE", image);
  });

  test("set form empty for transaction", () => {
    const commit = jest.fn();
    const fuelData = {
      data: {
        category: "FUEL",
        date: "",
        fuelType: "",
        kilometers: 1,
        liters: 1,
        amount: 100,
        title: "",
        location: ""
      }
    };
    actions.setFormEmpty({ commit }, fuelData);
    expect(commit).toHaveBeenCalledWith("SET_OCR_RESULT", fuelData);
  });

  test("set images for transaction", () => {
    const commit = jest.fn();
    actions.setImages({ commit }, image);
    expect(commit).toHaveBeenCalledWith("SET_IMAGES", image);
  });

  test("create Transaction for image, set ocr result and its type", async () => {
    api.createTransaction = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method == "POST"
    );
    api.createTransaction.mockResolvedValue({
      data: expectedValue
    });
    const commit = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123",
        id: 123
      }
    };
    await actions.createTransaction({ commit, rootState }, image);
    expect(commit).toHaveBeenCalledWith("SET_OCR_RESULT", expectedValue);
  });

  test("get a transaction", async () => {
    api.getTransactionByCategory = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.transaction + "/1" && d.method == "GET"
    );
    const isOCR = true;
    api.getTransactionByCategory.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getTransactionByCategory({ commit, rootState }, [id, isOCR]);
    expect(commit).toHaveBeenCalledWith("SET_TRANSACTION", expectedValue.data);
  });

  test("get list of transactions by category", async () => {
    api.getTransactionsByCategory = jest.fn();
    const isOCR = true;
    const options = {
      page: 1,
      size: 5,
      sortBy: "created_at"
    };
    const expectedValue = data.find(
      d =>
        d.url === url.transaction &&
        d.method == "GET" &&
        d.params.page === options.page &&
        d.params.category === "FUEL"
    );
    api.getTransactionsByCategory.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    await actions.getTransactionsByCategory({ commit, rootState }, [
      options,
      isOCR
    ]);
    expect(commit).toHaveBeenCalledWith("SET_TRANSACTIONS", expectedValue.data);
    expect(commit).toHaveBeenCalledWith("SET_PAGINATION", expectedValue.data);
  });

  test("save transaction form", async () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method == "PUT"
    );
    api.saveTransaction = jest.fn().mockResolvedValue(expectedValue);
    const transaction = {
      id: 500000026,
      image:
        "https://blogiin.files.wordpress.com/2016/03/struk-spbu.png?w=259&h=379",
      category: "FUEL",
      date: "2018-05-12T17:19:06.151Z",
      type: "Premium",
      liters: 5.0,
      unitPrice: 9000,
      created_at: "2018-05-12T17:19:06.151Z",
      modified_at: ""
    };
    expect(await actions.saveTransaction({ rootState }, transaction)).toEqual(
      expectedValue.data
    );
    expect(api.saveTransaction).toHaveBeenCalledWith(
      transaction,
      rootState.auth.token
    );
  });

  test("delete transaction", async () => {
    const isOCR = true;
    api.deleteTransaction = jest.fn();
    await actions.deleteTransaction({ rootState }, [id, isOCR]);
    expect(api.deleteTransaction).toHaveBeenCalledWith(
      id,
      isOCR,
      rootState.auth.token
    );
  });

  test("createMedicalTransaction", async () => {
    const expectedValue = data.find(
      d => d.url === url.medical && d.method == "POST"
    );
    api.createMedicalTransaction = jest.fn().mockResolvedValue(expectedValue);
    const medical = {
      date: "2019-08-13T11:27:50.000Z",
      title: "Ibu Sakit",
      amount: "10000",
      attachment: ["image.jpg"],
      patient: {
        id: 92761,
        name: "Andre Forbes",
        relationship: "CHILDREN",
        dateOfBirth: "898362000000"
      }
    };

    await actions.createMedicalTransaction({ rootState }, medical);
    expect(api.createMedicalTransaction).toHaveBeenCalledWith(
      medical,
      rootState.auth.token
    );
  });
});
