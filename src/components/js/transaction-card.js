import { mapActions } from "vuex";
export default {
  name: "TransactionCard",
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
        this.$router.push({ query: { ...this.$route.query, page: 1 } })
      })
    },
    moveTo (transactionId) {
      this.$router.push({
        name: "transaction-detail",
        params: { id: transactionId }
      });
    }
  }
};
