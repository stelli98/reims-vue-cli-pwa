const TransactionCard = () => import("@/components/user/TransactionCard.vue");
const DownloadPopUp = () => import("@/components/common/DownloadPopUp.vue");
import { ModalBus } from "@/components/common/js/event-bus.js";
import PopUpModalRoot from "@/components/common/PopUpModalRoot.vue";

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
      type: this.$route.query.category || "FUEL"
    };
  },
  computed: {
    isFiltering() {
      return (
        !!this.$route.query.search ||
        !!this.$route.query.start ||
        !!this.$route.query.end ||
        this.$route.query.sortBy != "createdAt" ||
        this.$route.query.category != "FUEL"
      );
    },
    selectedTransactionType: {
      set(newValue) {
        this.type = newValue || this.$route.query.category.toUpperCase();
      },
      get() {
        return this.type;
      }
    }
  },
  methods: {
    openFilter() {
      this.$emit("openFilter", true);
    },
    downloadReport() {
      ModalBus.$emit("open", {
        component: DownloadPopUp,
        title: "Download Report",
        type: "information"
      });
    },
    deleteTransaction() {
      this.$emit("deleteTransaction");
    },
    viewTransactionDetail(id) {
      this.$router.push({
        name: "transaction-detail",
        params: { id: id }
      });
    }
  },
  watch: {
    selectedTransactionType() {
      const query = {
        ...this.$route.query,
        page: "1",
        category: this.selectedTransactionType.toUpperCase()
      };
      this.$router.push({ query });
    },
    "$route.query.category"() {
      this.type = this.$route.query.category;
    }
  }
};
