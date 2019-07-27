import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  image: "",
  OCRResultType: "FUEL",
  parking: {
    category: "PARKING",
    date: "",
    out: "",
    amount: 0,
    title: "",
    parkingType: "",
    license: "",
    location: "",
    hours: 0,
    userId: "",
    image: ""
  },
  fuel: {
    category: "FUEL",
    date: "",
    fuelType: "",
    liters: 0,
    amount: 0,
    title: "",
    userId: "",
    image: ""
  },
  transactions: [],
  transaction: {},
  pagination: {}
};

export default { state, actions, mutations, getters, namespaced };
