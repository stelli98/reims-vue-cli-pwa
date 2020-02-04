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
    getImageList() {
      let requests = this.transaction.attachments.map(image => {
        return this.getViewImage(image).then(response =>{
          response.data.data
        });
      });

      Promise.all(requests).then(response => {
        this.images = response;
      });
    },
    imagePath(image) {
      return `data:image/png;base64,${image}`;
    }
  },
  mounted() {
    this.getTransactionByCategory([this.transactionId, this.isOCR]).then(() => {
      this.getImageList();
      this.isLoading = true;
    });
  }
};
