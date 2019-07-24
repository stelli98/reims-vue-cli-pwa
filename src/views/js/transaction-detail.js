import ViewFuelDetail from "@/components/ViewFuelDetail.vue";
import ViewParkingDetail from "@/components/ViewParkingDetail.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ViewFuelDetail,
    ViewParkingDetail
  },
  computed: {
    ...mapGetters("transaction", ["transaction"]),
    transactionId () {
      return this.$route.params.id;
    },
    transactionCategory () {
      return this.$options.filters.textFormatter(this.transaction.category);
    },
    activeComponent () {
      return this.transactionCategory
        ? `View${this.transactionCategory}Detail`
        : "";
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransaction"]),
    moveTo () {
      this.$router.push({ name: 'home' });
    }
  },
  mounted () {
    this.getTransaction(this.transactionId);
  }
};
