import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;
const state = {
  image: "",
  OCRResultType: "",
  parking: {
    in: "",
    out: "",
    price: 0,
    title: "",
    vehicle: "",
    license: "",
    location: ""
  },
  fuel: {
    date: "",
    type: "",
    volume: 0,
    unitPrice: 0,
    title: ""
  },
  transactions: [],
  transaction: {},
  pagination: {}
};

export default { state, actions, mutations, namespaced };
