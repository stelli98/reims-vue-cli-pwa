export default {
  props: {
    transaction: Object
  },
  computed: {
    totalPrice() {
      return this.transaction.amount * this.transaction.liters;
    }
  }
};
