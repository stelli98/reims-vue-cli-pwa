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
    amount: 100,
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
    liters: 0.01,
    amount: 100,
    title: "",
    userId: "",
    image: ""
  },
  transactions: [],
  transaction: {},
  pagination: {},
  viewImage: ""
};

export default { state, actions, mutations, getters, namespaced };
