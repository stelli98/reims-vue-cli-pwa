const TransactionList = () => import("@/components/TransactionList");
const Pagination = () => import("@/components/Pagination.vue");
const SortFilter = () => import("@/components/SortFilter.vue");
const FloatingActionButton = () => import("@/components/FloatingActionButton.vue");
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
        sortBy: "date"
      },
      actionButtonActive: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"]),
    actionButtonClass() {
      return `action-button action-button-${this.transactions.length == 5}`;
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
    updateTransaction() {
      this.getTransactions(this.$route.query).then(() => {
        if (this.transactions.length == 0) {
          this.changePage(1);
        }
      });
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
      this.updateTransaction();
    }
  },
  mounted() {
    this.$router.push({ query: { ...this.options, ...this.$route.query } });
    this.updateTransaction();
  }
};
