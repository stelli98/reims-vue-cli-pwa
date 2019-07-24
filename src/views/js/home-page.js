import TransactionList from "@/components/TransactionList";
import Pagination from "@/components/Pagination.vue";
import SortFilter from "@/components/SortFilter.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    TransactionList,
    Pagination,
    SortFilter
  },
  mounted () {
    this.updateTransaction(this.options);
  },
  data () {
    return {
      showFilter: false
    };
  },
  computed: {
    ...mapState("transaction", ["transactions", "pagination"]),
    options () {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 5,
        sortBy: "createdAt"
      };
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage", "getTransactions"]),
    ...mapActions("auth", ["logout"]),
    onFileChange (e) {
      const file = URL.createObjectURL(e.target.files[0]);
      this.setImage(file);
      this.$router.push({
        name: "create",
        params: { step: 1 }
      });
    },
    changePage (toPage) {
      this.options.page = parseInt(toPage);
      const allOptions = { ...this.$route.query, ...this.options };
      this.$router.push({ name: "home", query: allOptions });
      this.getTransactions(allOptions);
    },
    toogleFilter (value) {
      this.showFilter = value;
    },
    updateTransaction (options) {
      this.getTransactions(options);
    },
    moveTo (toPage) {
      this.$router.push({ name: toPage });
    },
    applyFilter (options) {
      this.options.page = 1;
      const allOptions = { ...this.options, ...options };
      this.updateTransaction(allOptions);
    },
    doLogout () {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    }
  },
  watch: {
    options () {
      const allOptions = { ...this.options, ...this.$route.query };
      this.updateTransaction(allOptions);
    }
  }
};
