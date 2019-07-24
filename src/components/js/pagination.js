export default {
  props: {
    paging: Object
  },
  data () {
    return {
      currentPage: this.$route.query.page || 1
    };
  },
  computed: {
    inputPage: {
      set (value) {
        this.currentPage = value;
      },
      get () {
        return this.currentPage;
      }
    }
  },
  methods: {
    moveTo (toPage) {
      this.inputPage = toPage;
      this.$emit("changePage", toPage);
    }
  }
};
