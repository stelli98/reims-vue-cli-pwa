import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  image: "",
  OCRResultType: "FUEL",
  OCRResultImage: "",
  parking: {
    category: "PARKING",
    in: "",
    out: "",
    amount: 0,
    title: "",
    vehicle: "",
    license: "",
    location: ""
  },
  fuel: {
    category: "FUEL",
    date: "",
    type: "",
    volume: 0,
    amount: 0,
    title: ""
  },
  transactions: [],
  transaction: {},
  pagination: {}
};

export default { state, actions, mutations, getters, namespaced };
