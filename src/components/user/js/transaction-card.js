import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
  mixins: [CommonMixins],
  name: "TransactionCard",
  props: {
    transaction: Object
  },
  computed: {
    transactionTitle() {
      return this.$options.filters.trimTextFormatter(
        this.transaction.title,
        20
      );
    },
    transactionCategory() {
      return this.$route.query.category
        ? this.$route.query.category.toLowerCase()
        : "";
    },
    isOCR() {
      return this.transactionCategory != "medical";
    }
  },
  methods: {
    ...mapActions("transaction", ["deleteTransaction"]),
    removeTransaction(id) {
      this.deleteTransaction([id, this.isOCR]).then(() => {
        this.$emit("deleteATransaction");
      });
    },
    viewTransactionDetail(id) {
      this.$router.push({
        name: "transaction-detail",
        params: { id: id },
        query: { category: this.transactionCategory }
      });
    }
  }
};
