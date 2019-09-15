const CropImage = () => import("@/components/CropImage.vue");
const FilterImage = () => import("@/components/FilterImage.vue");
const TransactionForm = () => import("@/components/TransactionForm.vue");
import offlineService from "@/api/transaction-offline";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CropImage,
    FilterImage,
    TransactionForm
  },
  data() {
    return {
      pictureUrl: ""
    };
  },
  computed: {
    ...mapGetters("transaction", ["OCRResultType"]),
    activeSecondProgressBar(){
      return this.$route.name === "create-transaction-2" ? "progress-bar-active" : ""
    },
    activeThirdProgressBar(){
      return this.$route.name === "create-transaction-3" ? "progress-bar-active" : ""
    }
    // activeTab() {
    //   return this.$route.params.step;
    // },
    // activeComponent() {
    //   return this.menus[this.activeTab].component;
    // },
    // transactionDisabled() {
    //   return !this.OCRResultType && this.activeTab == 3;
    // }
  },
  methods: {
    ...mapActions("transaction", ["setImage", "setOCRResultType"]),
    moveTo() {
      this.deleteDataFromIDB();
      this.$router.push({ name: "home" });
    },
    deleteDataFromIDB() {
      try {
        offlineService.deleteLastDataFromIndexedDB("offlineImages");
      } catch (e) {
        return e;
      }
    },
    moveToNextStep(goToPage){
      this.$router.push({name:"create",params: { step: goToPage }});
    }
  },
  // watch: {
  //   $route() {
  //     if (
  //       !this.$route.path.includes("/transaction/create/") &&
  //       this.activeTab == 3
  //     ) {
  //       this.deleteDataFromIDB();
  //     }
  //   }
  // }
};
