import { Datetime } from "vue-datetime";
export default {
  components: { Datetime },
  data () {
    return {
      options: this.emptyOptions(),
      sortByOptions: ["date", "category", "title"],
      categoryOptions: ["FUEL", "PARKING"],
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
        return this.options.end ?
          new Date(this.options.end).toISOString() :
          ""
      }
    },
    isStartAndEndSelected () {
      return this.options.start && !this.options.end ? true : false
    }

  },
  methods: {
    moveTo () {
      this.$emit("closeFilter", false);
    },
    applyFilter () {
      if (!this.isStartAndEndSelected) {
        this.options.start = this.options.start ? new Date(this.options.start).getTime() : ""
        this.options.end = this.options.end ? new Date(this.options.end).getTime() : ""
        this.options.page = 1
        this.$router.push({ query: { ...this.$route.query, ...this.options } })
        this.moveTo();
      }
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
    },

  },
  created () {
    this.options = { ...this.options, ...this.$route.query }
    this.options.start = !!this.options.start ? new Date(parseInt(this.$route.query.start)).toISOString() : ""
    this.options.end = !!this.options.end ? new Date(parseInt(this.$route.query.end)).toISOString() : ""
  }
};
