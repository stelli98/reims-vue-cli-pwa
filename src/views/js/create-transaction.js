import offlineService from "@/api/transaction-offline";
import { mapActions, mapGetters } from "vuex";
export default {
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
      this.$router.push({ name: "home" });
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
