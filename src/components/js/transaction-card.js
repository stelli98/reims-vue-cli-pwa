import { mapActions } from "vuex";
export default {
  props: {
    transaction: Object
  },
  computed: {
    transactionTitle() {
      return this.$options.filters.trimTextFormatter(
        this.transaction.title,
        20
      );
    }
  },
  methods: {
    ...mapActions("transaction", ["deleteTransaction"]),
    removeTransaction(id) {
      this.deleteTransaction(id);
    }
  }
};
