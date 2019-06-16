import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  image: "",
  OCRResultType: "",
  parking: {
    in: "",
    out: "",
    price: "",
    title: "",
    vehicle: "",
    license: "",
    location: ""
  },
  fuel: {
    date: "",
    type: "",
    volume: "",
    unitPrice: "",
    title: ""
  },
  transactions: [],
  transaction: {},
  pagination: {}
};

export default { state, actions, mutations, getters, namespaced };
