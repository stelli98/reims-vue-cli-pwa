export default {
  props: {
    transaction: Object
  },
  methods: {
    transactionCategory(category) {
      return category ? category.toLowerCase() : "medical";
    }
  }
};
