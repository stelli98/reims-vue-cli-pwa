const ViewFuelDetail = () => import("@/components/user/ViewFuelDetail.vue");
const ViewParkingDetail = () =>
  import("@/components/user/ViewParkingDetail.vue");
const ViewMedicalDetail = () =>
  import("@/components/user/ViewMedicalDetail.vue");
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
      isLoading: false,
      images: []
    };
  },
  computed: {
    ...mapGetters("transaction", ["transaction"]),
    isOCR() {
      return this.transactionCategory.toLowerCase() != "medical";
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
    transactionDate() {
      return this.$options.filters.dateFormatter(this.transaction.date);
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactionByCategory"]),
    ...mapActions("user", ["getViewImage"]),
    imagePath(image) {
      return `data:image/png;base64,${image}`;
    },
    getImageList() {
      Promise.all(
        this.transaction.attachments.map(image => {
          this.getViewImage(image)
            .then(response => this.checkStatus(response))
            .then(data => this.images.push(data));
        })
      );
    },
    checkStatus(response) {
      if (response.data.code == 200) {
        return Promise.resolve(response.data.data);
      } else {
        return Promise.reject(new Error("Error"));
      }
    }
  },
  mounted() {
    this.getTransactionByCategory([this.transactionId, this.isOCR]).then(() => {
      this.getImageList();
      this.isLoading = true;
    });
  }
};
