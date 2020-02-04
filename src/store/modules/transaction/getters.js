export default {
  transactions(state) {
    return state.transactions || [];
  },
  transaction(state) {
    return state.transaction;
  },
  pagination(state) {
    return state.pagination;
  },
  image(state) {
    return state.image;
  },
  images(state) {
    return state.images;
  },
  parking(state) {
    return state.parking;
  },
  fuel(state) {
    return state.fuel;
  }
};
