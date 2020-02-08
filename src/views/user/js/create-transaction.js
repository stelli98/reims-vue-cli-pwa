import offlineService from "@/api/transaction-offline";
import { mapActions } from "vuex";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  components: { GlobalHeader},
  computed: {
    activeSecondProgressBar(){
      return this.$route.name === "create-transaction-2" ? "progress-bar-active" : ""
    },
    activeThirdProgressBar(){
      return this.$route.name === "create-transaction-3" ? "progress-bar-active" : ""
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage"]),
    moveTo() {
      this.deleteDataFromIDB();
      this.$router.push({ name: "home", query: {category: this.$route.query.category} });
    },
    deleteDataFromIDB() {
      try {
        offlineService.deleteLastDataFromIndexedDB("offlineImages");
      } catch (e) {
        return e;
      }
    }
  },
  watch: {
    $route() {
      if (
        !this.$route.path.includes("/transaction/create/") &&
        this.activeTab == 3
      ) {
        this.deleteDataFromIDB();
      }
    }
  }
};
