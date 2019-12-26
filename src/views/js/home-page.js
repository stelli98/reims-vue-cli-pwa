const TransactionList = () => import("@/components/TransactionList");
const Pagination = () => import("@/components/Pagination.vue");
const SortFilter = () => import("@/components/SortFilter.vue");
const FloatingActionButton = () =>
  import("@/components/FloatingActionButton.vue");
import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
  mixins: [CommonMixins],
  components: {
    TransactionList,
    Pagination,
    SortFilter,
    FloatingActionButton
  },
  data() {
    return {
      showFilter: false,
      options: {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 5,
        sortBy: this.$route.query.sortBy || "date",
        category: this.$route.query.category || "fuel"
      },
      actionButtonActive: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"]),
    actionButtonClass() {
      return `action-button action-button-${this.transactions.length == 5}`;
    },
    isOCR() {
      return this.$route.query.category.toLowerCase() != "medical";
    },
    transactionOptions() {
      return {
        page: this.$route.query.page,
        size: this.$route.query.size,
        sortBy: this.$route.query.sortBy,
        category: this.$route.query.category
      };
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactionsByCategory"]),
    ...mapActions("user", ["downloadPersonalReport"]),
    ...mapActions("auth", ["logout"]),
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page: page } });
    },
    toogleFilter(value) {
      this.showFilter = value;
    },
    updateTransaction() {
      this.getTransactionsByCategory([this.$route.query, this.isOCR]).then(
        () => {
          if (this.transactions.length == 0 && this.$route.query.page != 1) {
            this.changePage(1);
          }
        }
      );
    },
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    download() {
      this.downloadPersonalReport(this.$route.query);
    },
    toggleActionButton(value) {
      this.actionButtonActive = value;
    }
  },
  mounted() {
    this.$router.push({ query: { ...this.options, ...this.$route.query } });
    this.updateTransaction();
  },
  watch: {
    transactionOptions() {
      this.updateTransaction();
    }
  }
};
