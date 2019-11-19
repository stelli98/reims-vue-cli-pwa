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
    userId: "",
    image: ""
  },
  fuel: {
    category: "FUEL",
    date: "",
    fuelType: "",
    kilometer: 1,
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
