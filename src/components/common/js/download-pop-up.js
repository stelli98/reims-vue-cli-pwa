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
    },
    payload() {
      return {
        type: this.selectedTransactionType.toLowerCase(),
        start: this.firstDateOfMonth(
          this.selectedMonthInt(this.selectedMonth),
          this.selectedYear
        ),
        end: this.lastDateOfMonth(
          this.selectedMonthInt(this.selectedMonth),
          this.selectedYear
        )
      };
    }
  },
  methods: {
    ...mapActions("user", ["downloadPersonalReport"]),
    firstDateOfMonth(month, year) {
      return new Date(year, month, 1).getTime();
    },
    lastDateOfMonth(month, year) {
      return new Date(year, month + 1, 0).getTime();
    },
    selectedMonthInt(selectedMonthName) {
      return this.monthsName.findIndex(month => selectedMonthName === month);
    },
    downloadReport() {
      this.downloadPersonalReport(this.payload).then(response => {
        const base64File = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${response.data.data}`;
        const dummyLink = document.createElement("a");
        dummyLink.href = base64File;
        dummyLink.download = `${this.$options.filters.textFormatter(
          this.payload.type
        )}-${this.selectedMonth}-${this.selectedYear}.xlsx`;
        dummyLink.click();
      });
      this.$emit("onClose");
    }
  }
};
