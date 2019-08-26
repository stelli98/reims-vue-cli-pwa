const TransactionCard = () =>import("@/components/ParkingForm.vue");
export default {
  components: {
    TransactionCard
  },
  props: {
    transactions: Array
  },
  computed: {
    isFiltering () {
      return !!this.$route.query.search || !!this.$route.query.category || !!this.$route.query.start || !!this.$route.query.end || this.$route.query.sortBy != "date"
    }
  },
  methods: {
    openFilter () {
      this.$emit("openFilter", true);
    },
    downloadReport () {
      this.$emit("downloadReport")
    }
  }
};
