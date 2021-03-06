export default {
  SET_IMAGE(state, img) {
    state.image = img;
  },
  SET_IMAGES(state, images){
    state.images = images;
  },
  SET_OCR_RESULT(state, { data }) {
    state[data.category.toLowerCase()] = {
      ...state[data.category.toLowerCase()],
      ...data
    };
  },
  SET_TRANSACTION(state, { data }) {
    state.transaction = data;
  },
  SET_TRANSACTIONS(state, { data }) {
    state.transactions = data;
  },
  SET_PAGINATION(state, { paging }) {
    state.pagination = paging;
  }
};
