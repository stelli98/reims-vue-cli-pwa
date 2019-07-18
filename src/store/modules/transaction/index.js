import actions from "./actions";
import mutations from "./mutations";

const namespaced = true;
const state = {
  image: "",
  OCRResultType: "",
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

export default { state, actions, mutations, namespaced };
