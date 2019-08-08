import { Datetime } from "vue-datetime";
export default {
  components: { Datetime },
  data () {
    return {
      options: this.emptyOptions(),
      sortByOptions: ["date", "category", "title"],
      categoryOptions: ["FUEL", "PARKING"]
    };
  },
  computed: {
    currentDateTime () {
      return new Date().toISOString()
    },
    formatStart: {
      set (newValue) {
        this.options.start = newValue;
      },
      get () {
        return this.options.start ? new Date(this.options.start).toISOString() : ""
      }
    },
    formatEnd: {
      set (newValue) {
        this.options.end = newValue;
      },
      get () {
        return this.options.out ?
          new Date(this.options.end).toISOString() : ""
      }
    },
  },
  methods: {
    moveTo () {
      this.$emit("closeFilter", false);
      console.log('B')
    },
    applyFilter () {
      this.options.start = this.options.start ? new Date(this.options.start).getTime() : ""
      this.options.end = this.options.end ? new Date(this.options.end).getTime() : ""
      this.options.page = 1
      this.$router.replace({ query: { ...this.$route.query, ...this.options } })
      console.log('A', this.$route.query)
      this.moveTo();
    },
    emptyOptions () {
      return {
        search: "",
        sortBy: "",
        category: "",
        start: "",
        end: ""
      };
    },
    resetFilter () {
      this.options = this.emptyOptions();
    }
  }
};
