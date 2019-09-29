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
    moveTo(pageToGo) {
      this.currentPage = pageToGo;
      this.$emit("changePage", this.currentPage);
    }
  },
  watch: {
    $route() {
      this.currentPage = this.$route.query.page;
    }
  }
};
