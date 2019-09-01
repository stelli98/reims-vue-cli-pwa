const TransactionList = () => import("@/components/TransactionList");
const Pagination = () => import("@/components/Pagination.vue");
const SortFilter = () => import("@/components/SortFilter.vue");
import { mapActions, mapGetters } from "vuex";
import transactionApi from "@/api/transaction";

export default {
  components: {
    TransactionList,
    Pagination,
    SortFilter
  },
  data () {
    return {
      showFilter: false,
      options: {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 5,
        sortBy: "date",
      }
    };
  },
  computed: {
    ...mapGetters("transaction", ["transactions", "pagination"])
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
      this.downloadPersonalReport(this.$route.query)
    },
    postTest () {
      console.log('call test')
      transactionApi.postTest()
    }
  },
  watch: {
    '$route' () {
      this.updateTransaction().then(response => {
        console.log(response)
      })
    },
  },
  mounted () {
    this.$router.push({ query: { ...this.options, ...this.$route.query } })
    this.updateTransaction();
  }
};

