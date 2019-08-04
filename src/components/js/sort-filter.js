import { Datetime } from "vue-datetime";
export default {
  components: { Datetime },
  data() {
    return {
      options: this.emptyOptions(),
      sortByOptions: ["date", "category", "title"],
      categoryOptions: ["FUEL", "PARKING"]
    };
  },
  methods: {
    moveTo() {
      this.$emit("closeFilter", false);
    },
    applyFilter() {
      this.$emit("applyFilter", this.options);
      this.moveTo();
    },
    emptyOptions() {
      return {
        search: "",
        sortBy: "",
        category: "",
        startDate: "",
        endDate: ""
      };
    },
    resetFilter() {
      this.options = this.emptyOptions();
      this.applyFilter();
    }
  }
};
