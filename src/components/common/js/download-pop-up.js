import { mapActions } from "vuex";

export default {
  data() {
    return {
      transactionType: ["Fuel", "Parking", "Medical"],
      selectedTransactionType: "Fuel",
      selectedYear: new Date().getFullYear(),
      inputMonth: "",
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      monthsName: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      limitYear: 2016,
      yearOptions: [],
      monthOptions: []
    };
  },
  computed: {
    selectedMonth: {
      set(value) {
        this.inputMonth = value;
      },
      get() {
        return this.inputMonth || this.monthsName[this.currentMonth];
      }
    },
    months() {
      this.monthOptions = [];
      if (this.currentYear == this.selectedYear) {
        for (var i = 0; i <= this.currentMonth; i++) {
          this.monthOptions.push(this.monthsName[i]);
        }
        return this.monthOptions;
      }
      return this.monthsName;
    },
    years() {
      while (this.limitYear <= this.selectedYear) {
        this.yearOptions.push(this.limitYear++);
      }
      return this.yearOptions;
    }
  },
  methods: {
    ...mapActions("user", ["downloadPersonalReport"]),
    downloadReport() {
      this.downloadPersonalReport({
        type: this.selectedTransactionType,
        month: this.selectedMonth,
        year: this.selectedYear
      });
      this.$emit('onClose')
    }
  }
};
