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
    }
  },
  methods: {
    ...mapActions("transaction", ["deleteTransaction"]),
    removeTransaction(id) {
      this.deleteTransaction(id).then(() => {
        this.$emit('deleteATransaction')
      });
    }
  }
};
