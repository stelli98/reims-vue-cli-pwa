const TransactionList = () => import("@/components/user/TransactionList");
const Pagination = () => import("@/components/common/Pagination.vue");
const SortFilter = () => import("@/components/user/SortFilter.vue");
const FloatingActionButton = () =>
  import("@/components/user/FloatingActionButton.vue");
import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
import offlineService from "@/api/transaction-offline";

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
        sortBy: this.$route.query.sortBy || "createdAt",
        category: this.$route.query.category || "FUEL"
      },
      actionButtonActive: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"]),
    isOCR() {
      return this.$route.query.category.toLowerCase() != "medical";
    },
    transactionOptions() {
      return {
        page: parseInt(this.$route.query.page),
        size: parseInt(this.$route.query.size),
        sortBy: this.$route.query.sortBy,
        category: this.$route.query.category
          ? this.$route.query.category.toUpperCase()
          : ""
      };
    }
  },
  methods: {
    ...mapActions("transaction", ["getTransactionsByCategory"]),
    ...mapActions("auth", ["logout"]),
    changePage(page) {
      this.$router.push({ query: { ...this.$route.query, page: page } });
    },
    toogleFilter(value) {
      this.showFilter = value;
    },
    updateTransaction() {
      this.getTransactionsByCategory([
        { ...this.options, ...this.$route.query },
        this.isOCR
      ]).then(() => {
        if (this.transactions.length == 0 && this.$route.query.page != 1) {
          this.changePage(1);
        }
      });
    },
    doLogout() {
      this.logout().then(() => {
        this.moveTo("login");
        offlineService.deleteAllIDBDatabase();
      });
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
