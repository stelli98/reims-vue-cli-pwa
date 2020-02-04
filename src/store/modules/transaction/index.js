import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const namespaced = true;
const state = {
  image: "",
  images: [],
  parking: {
    category: "PARKING",
    date: "",
    amount: 100,
    title: "",
    location:"",
    userId: ""
  },
  fuel: {
    category: "FUEL",
    date: "",
    fuelType: "",
    kilometers: 1,
    liters: 0.1,
    amount: 100,
    title: "",
    location:"",
    userId: "",
  },
  transactionMedical: {},
  transactions: [],
  transaction: {},
  pagination: {}
};

export default { state, actions, mutations, getters, namespaced };
