import { Datetime } from "vue-datetime";

export default {
  components: { Datetime },
  data() {
    return {
      options: this.emptyOptions(),
      sortByOptions: ["date", "title"],
      categoryOptions: ["FUEL", "PARKING","MEDICAL"]
    };
  },
  computed: {
    currentDateTime() {
      return new Date().toISOString();
    },
    formatStart: {
      set(newValue) {
        this.options.start = newValue;
      },
      get() {
        return this.options.start
          ? new Date(this.options.start).toISOString()
          : "";
      }
    },
    formatEnd: {
      set(newValue) {
        this.options.end = newValue;
      },
      get() {
        return this.options.end ? new Date(this.options.end).toISOString() : "";
      }
    },
    isEndSelected() {
      return this.options.start && !this.options.end ? true : false;
    },
    isStartSelected() {
      return this.options.end && !this.options.start ? true : false;
    }
  },
  methods: {
    closeFilterForm() {
      this.$emit("closeFilter", false);
    },
    applyFilter() {
      if (!this.isEndSelected && !this.isStartSelected) {
        this.options.start = this.options.start
          ? new Date(this.options.start).getTime()
          : "";
        this.options.end = this.options.end
          ? new Date(this.options.end).getTime()
          : "";
        this.options.page = 1;
        this.$router.push({ query: { ...this.$route.query, ...this.options } });
        this.closeFilterForm();
      }
    },
    emptyOptions() {
      return {
        search: "",
        sortBy: "date",
        category: "FUEL",
        start: "",
        end: ""
      };
    },
    resetFilter() {
      this.options = this.emptyOptions();
    },
    convertDateToISOString() {
      this.options.start = this.options.start
        ? new Date(parseInt(this.$route.query.start)).toISOString()
        : "";
      this.options.end = this.options.end
        ? new Date(parseInt(this.$route.query.end)).toISOString()
        : "";
    }
  },
  created() {
    this.options = { ...this.options, ...this.$route.query };
    this.convertDateToISOString();
  }
};
