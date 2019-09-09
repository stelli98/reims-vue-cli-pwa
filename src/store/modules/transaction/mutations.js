export default {
  SET_IMAGE(state, img) {
    state.image = img;
  },
  SET_OCR_RESULT(state, { data }) {
    state[data.category.toLowerCase()] = {
      ...state[data.category.toLowerCase()],
      ...data
    };
  },
  SET_OCR_RESULT_TYPE(state, category) {
    state.OCRResultType = category;
  },
  ADD_IMAGE_FUEL(state, image) {
    state.fuel.image = image;
  },
  ADD_IMAGE_PARKING(state, image) {
    state.parking.image = image;
  },
  ADD_USER_ID_FUEL(state, id) {
    state.fuel.userId = id;
  },
  ADD_USER_ID_PARKING(state, id) {
    state.parking.userId = id;
  },
  SET_TRANSACTION(state, { data }) {
    state.transaction = data;
  },
  SET_TRANSACTIONS(state, { data }) {
    state.transactions = data;
  },
  SET_PAGINATION(state, { paging }) {
    state.pagination = paging;
  },
  SET_VIEW_IMAGE(state, { data }) {
    state.viewImage = data;
  },
  DELETE_TRANSACTION(state, id) {
    state.transactions = state.transactions.filter(x => x.id != id);
  }
};
