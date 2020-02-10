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
      this.$router.push({
        query: { ...this.$route.query, page: parseInt(pageToGo) }
      });
    }
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page;
    }
  }
};
