const ViewFuelDetail = () => import("@/components/user/ViewFuelDetail.vue");
const ViewParkingDetail = () => import("@/components/user/ViewParkingDetail.vue");
const ViewMedicalDetail = () => import("@/components/user/ViewMedicalDetail.vue");
const GlobalHeader = () => import("@/components/common/GlobalHeader");

import { Carousel, Slide } from "vue-carousel";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    ViewFuelDetail,
    ViewParkingDetail,
    ViewMedicalDetail,
    GlobalHeader,
    ViewMedicalDetail,
    Carousel,
    Slide
  },
  data() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["transaction", "viewImage"]),
    isOCR() {
      return this.transactionCategory != "medical";
    },
    transactionId() {
      return this.$route.params.id;
    },
    transactionCategory() {
      return this.$options.filters.textFormatter(this.$route.query.category);
    },
    activeComponent() {
      return this.transactionCategory
        ? `View${this.transactionCategory}Detail`
        : "";
    },
    imageExt() {
      return this.transaction.image ? this.transaction.image.split(".")[1] : "";
    },
    imagePath() {
      return this.transaction.image ? this.transaction.image.split(".")[0] : "";
    },
    imageBase64() {
      return `data:image/${this.imageExt};base64,${this.viewImage}`;
    },
    transactionDate(){
      return this.$options.filters.dateFormatter(this.transaction.date);
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactionByCategory", "getViewImage"])
  },
  mounted() {
    this.getTransactionByCategory(this.transactionId).then(() => {
      this.getViewImage(this.imagePath);
      this.isLoading = true;
    });
  }
};
