import actions from "@/store/modules/transaction/actions";
import api from "@/api/transaction";
import data from "@/api-mock/mock-data";
import config from "@/config";

const url = config.api.transactions;
const image = "image.jpg";
const id = 1;
jest.mock("@/api/transaction");

describe("Actions for Transactions Module", () => {
  test("set image for transaction", () => {
    const commit = jest.fn();
    actions.setImage({ commit }, image);
    expect(commit).toHaveBeenCalledWith("SET_IMAGE", image);
  });

  test("set OCR Result Type for transaction", () => {
    const type = "FUEL";
    const commit = jest.fn();
    actions.setOCRResultType({ commit }, type);
    expect(commit).toHaveBeenCalledWith("SET_OCR_RESULT_TYPE", type);
  });

  test("set form to be empty", () => {
    const data = {
      in: "",
      out: "",
      price: 0,
      title: "",
      type: "",
      license: "",
      location: "",
      category: "PARKING"
    };
    const commit = jest.fn();
    actions.setFormEmpty({ commit }, data);
    expect(commit).toHaveBeenCalledWith("SET_OCR_RESULT", data);
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
    expect(commit).toHaveBeenCalledWith(
      "SET_OCR_RESULT_TYPE",
      expectedValue.data.category
    );
    expect(commit).toHaveBeenCalledWith(
      "ADD_IMAGE_FUEL",
      expectedValue.data.image
    );
    expect(commit).toHaveBeenCalledWith(
      "ADD_IMAGE_PARKING",
      expectedValue.data.image
    );
    expect(commit).toHaveBeenCalledWith("ADD_USER_ID_FUEL", rootState.auth.id);
    expect(commit).toHaveBeenCalledWith(
      "ADD_USER_ID_PARKING",
      rootState.auth.id
    );
  });

  test("get a transaction", async () => {
    api.getTransaction = jest.fn();
    const expectedValue = data.find(
      d => d.url === url.transaction + "/1" && d.method == "GET"
    );
    api.getTransaction.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    await actions.getTransaction({ commit, rootState }, id);
    expect(commit).toHaveBeenCalledWith("SET_TRANSACTION", expectedValue.data);
  });

  test("get list of transactions", async () => {
    api.getTransactions = jest.fn();
    const options = {
      page: 1,
      size: 5,
      sortBy: "createdAt"
    };
    const expectedValue = data.find(
      d =>
        d.url === url.transaction &&
        d.method == "GET" &&
        d.params.page === options.page
    );
    api.getTransactions.mockResolvedValue(expectedValue);
    const commit = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
    await actions.getTransactions({ commit, rootState }, options);
    expect(commit).toHaveBeenCalledWith("SET_TRANSACTIONS", expectedValue.data);
    expect(commit).toHaveBeenCalledWith("SET_PAGINATION", expectedValue.data);
  });

  test("save transaction form", async () => {
    const expectedValue = data.find(
      d => d.url === url.transaction && d.method == "PUT"
    );
    api.saveTransaction = jest.fn().mockResolvedValue(expectedValue);
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };
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

  test("getViewImage action", async () => {
    api.getViewImage = jest.fn();
    const rootState = {
      auth: {
        token: "Bearer 123"
      }
    };

    const expectedValue = data.find(
      d => d.url === url.transaction + "/3278/12345abc" && d.method == "GET"
    );
    const link = "3278/12345abc";
    const commit = jest.fn();

    api.getViewImage.mockResolvedValue(expectedValue);
    await actions.getViewImage({ commit, rootState }, link);
    expect(commit).toHaveBeenCalledWith("SET_VIEW_IMAGE", expectedValue.data);
  });
});
