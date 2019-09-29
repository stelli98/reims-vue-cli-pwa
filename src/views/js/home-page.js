const TransactionList = () => import("@/components/TransactionList");
const Pagination = () => import("@/components/Pagination.vue");
const SortFilter = () => import("@/components/SortFilter.vue");
const FloatingActionButton = () => import("@/components/FloatingActionButton.vue");
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TransactionList,
    Pagination,
    SortFilter,
    FloatingActionButton
  },
  data() {
    return {
      showFilter: false,
      actionButtonActive: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"]),
    actionButtonClass() {
      return `action-button action-button-${this.transactions.length == 5}`;
    },
    options() {
      return {
        page: this.$route.query.page || "1",
        size: this.$route.query.size || "5",
        sortBy: "date"
      };
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactions"]),
    ...mapActions("user", ["downloadPersonalReport"]),
    ...mapActions("auth", ["logout"]),
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page: page } });
    },
    toogleFilter(value) {
      this.showFilter = value;
    },
    updateTransaction(params) {
      this.getTransactions(params).then(() => {
        if (this.transactions.length == 0) {
          this.changePage(1);
        }
      });
    },
    moveTo(toPage) {
      this.$router.push({ name: toPage });
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
  watch: {
    $route() {
      this.updateTransaction(this.$route.query);
    }
  },
  mounted() {
    this.$router.push({ query: { ...this.options,...this.$route.query}});
    this.updateTransaction(this.$route.query);
  }
};
