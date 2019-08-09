import TransactionList from "@/components/TransactionList";
import Pagination from "@/components/Pagination.vue";
import SortFilter from "@/components/SortFilter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TransactionList,
    Pagination,
    SortFilter
  },
  data () {
    return {
      showFilter: false,
      optionParams: this.initOptions()
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"]),
    options: {
      set (newValue) {
        this.optionsParams = newValue
      },
      get () {
        return this.optionParams
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage", "getTransactions"]),
    ...mapActions("user", ["downloadPersonalReport"]),
    ...mapActions("auth", ["logout"]),
    onFileChange (e) {
      const file = URL.createObjectURL(e.target.files[0]);
      this.setImage(file);
      this.$router.push({
        name: "create",
        params: { step: 1 }
      });
    },
    changePage (page) {
      this.$router.push({ query: { ...this.$route.query, page: page } });
    },
    toogleFilter (value) {
      this.showFilter = value;
    },
    updateTransaction () {
      this.getTransactions(this.$route.query).then(() => {
        if (this.transactions.length == 0) {
          this.changePage(1)
        }
      })

    },
    moveTo (toPage) {
      this.$router.push({ name: toPage });
    },
    doLogout () {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    },
    download () {
      const optionDownload = {
        start: this.$route.query.start,
        end: this.$route.query.end
      }
      this.downloadPersonalReport(optionDownload)
    },
    initOptions () {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 5,
        sortBy: "date",
      }
    }
  },
  watch: {
    '$route' () {
      this.updateTransaction();
    },
  },
  mounted () {
    this.$router.replace({ query: { ...this.options, ...this.$route.query } })
    this.updateTransaction();
  }
};

