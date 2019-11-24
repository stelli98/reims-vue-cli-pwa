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
  computed: {
    isFiltering() {
      return (
        !!this.$route.query.search ||
        !!this.$route.query.category ||
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
    }
  }
};
