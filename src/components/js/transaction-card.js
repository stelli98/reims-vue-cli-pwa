import { mapActions } from "vuex";
export default {
  props: {
    transaction: Object
  },
  computed: {
    transactionTitle () {
      return this.$options.filters.trimTextFormatter(
        this.transaction.title,
        20
      );
    }
  },
  methods: {
    ...mapActions("transaction", ["deleteTransaction"]),
    removeTransaction (id) {
      this.deleteTransaction(id).then(() => {
        this.$emit('updateTransactionList')
      })
    },
    moveTo (transactionId) {
      this.$router.push({ name: 'transaction-detail', params: { id: transactionId } })
    }
  }
};
