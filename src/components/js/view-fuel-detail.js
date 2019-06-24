export default {
  props: {
    transaction: Object
  },
  computed: {
    totalPrice() {
      return this.transaction.unitPrice * this.transaction.volume;
    }
  }
};
