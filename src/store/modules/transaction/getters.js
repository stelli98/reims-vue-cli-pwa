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
  OCRResultType(state) {
    return state.OCRResultType;
  },
  parking(state) {
    return state.parking;
  },
  fuel(state) {
    return state.fuel;
  },
  viewImage(state) {
    return state.viewImage;
  }
};
