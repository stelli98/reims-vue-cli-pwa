export default {
  SET_IMAGE (state, img) {
    state.image = img;
  },
  SET_OCR_RESULT (state, { data }) {

    console.log('actual1', data)
    state[data.category.toLowerCase()] = {
      ...state[data.category.toLowerCase()],
      ...data
    }
  },
  SET_OCR_RESULT_TYPE (state, category) {
    state.OCRResultType = category;
  },
  SET_OCR_RESULT_IMAGE (state, image) {
    state.OCRResultImage = image;
  },
  SET_TRANSACTION (state, { data }) {
    state.transaction = data;
  },
  SET_TRANSACTIONS (state, { data }) {
    state.transactions = data;
  },
  SET_PAGINATION (state, { paging }) {
    state.pagination = paging;
  }
};
