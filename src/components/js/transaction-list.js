import TransactionCard from "@/components/TransactionCard.vue";
export default {
  components: {
    TransactionCard
  },
  props: {
    transactions: Array
  },
  methods: {
    openFilter () {
      this.$emit("openFilter", true);
    },
    updateTransactions () {
      this.$emit('updateTransactions');
    }
  }
};
