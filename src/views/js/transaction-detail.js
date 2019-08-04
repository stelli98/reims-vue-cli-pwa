import ViewFuelDetail from "@/components/ViewFuelDetail.vue";
import ViewParkingDetail from "@/components/ViewParkingDetail.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ViewFuelDetail,
    ViewParkingDetail
  },
  data() {
    return {
      image: ""
    };
  },
  computed: {
    ...mapGetters("transaction", ["transaction", "viewImage"]),
    transactionId() {
      return this.$route.params.id;
    },
    transactionCategory() {
      return this.$options.filters.textFormatter(this.transaction.category);
    },
    activeComponent() {
      return this.transactionCategory
        ? `View${this.transactionCategory}Detail`
        : "";
    },
    transactionImageType() {
      return this.transaction.image
        ? this.transaction.image.split(".")[
            this.transaction.image.split(".").length - 1
          ]
        : "";
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransaction", "getViewImage"]),
    moveTo() {
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    this.getTransaction(this.transactionId);
  },
  watch: {
    transaction() {
      console.log(this.transaction);
      this.getViewImage(this.transaction.image).then(response => {
        this.image = response;
      });
    }
  }
};
