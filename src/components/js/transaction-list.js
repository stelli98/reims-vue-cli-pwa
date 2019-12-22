const TransactionCard = () => import("@/components/TransactionCard.vue");
const DownloadPopUp = () => import("@/components/DownloadPopUp.vue");
import { ModalBus } from "@/components/js/event-bus.js";
import PopUpModalRoot from "@/components/PopUpModalRoot.vue";

export default {
  components: {
    TransactionCard,
    PopUpModalRoot
  },
  props: {
    transactions: Array
  },
  data() {
    return {
      transactionType: ["FUEL", "PARKING", "MEDICAL"],
      selectedTransactionType: "FUEL"
    };
  },
  computed: {
    isFiltering() {
      return (
        !!this.$route.query.search ||
        !!this.$route.query.start ||
        !!this.$route.query.end ||
        this.$route.query.sortBy != "date"
      );
    }
  },
  methods: {
    openFilter() {
      this.$emit("openFilter", true);
    },
    downloadReport() {
      ModalBus.$emit("open", {
        component: DownloadPopUp,
        title: "Download Report"
      });
    },
    deleteTransaction() {
      this.$emit("deleteTransaction");
    }
  },
  watch: {
    selectedTransactionType() {
      const query = {
        ...this.$route.query,
        page: "1",
        category: this.selectedTransactionType.toLowerCase()
      };
      this.$router.push({ query });
    }
  }
};
