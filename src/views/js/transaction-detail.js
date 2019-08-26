const ViewFuelDetail = () => import("@/components/ViewFuelDetail.vue");
const ViewParkingDetail = () => import("@/components/ViewParkingDetail.vue");

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ViewFuelDetail,
    ViewParkingDetail
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters("transaction", ["transaction", "viewImage"]),
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
    },
    imageExt () {
      return this.transaction.image ? this.transaction.image.split(".")[1] : ""
    },
    imagePath () {
      return this.transaction.image ? this.transaction.image.split(".")[0] : ""
    },
    imageBase64 () {
      return `data:image/${this.imageExt};base64,${this.viewImage}`
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransaction", "getViewImage"])
  },
  mounted () {
    this.getTransaction(this.transactionId).then(() => {
      this.getViewImage(this.imagePath)
      this.isLoading = true;
    })
  }
};
