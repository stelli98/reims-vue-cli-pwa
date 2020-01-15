export default {
  props: {
    paging: Object
  },
  data() {
    return {
      currentPage: this.$route.query.page || 1
    };
  },
  methods: {
    changePageTo(pageToGo) {
      this.currentPage = pageToGo;
      this.$emit("changePage", parseInt(this.currentPage));
    }
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page;
    }
  }
};
