import { required, helpers, minValue } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { Datetime } from "vue-datetime";

const float = helpers.regex("decimal", /^[0-9]+([.][0-9]+)?$/);

export default {
  components: { Datetime },
  validations: {
    fuel: {
      date: { required },
      fuelType: { required },
      liters: {
        required,
        float(input) {
          return /^[0-9]+([.][0-9]+)?$/g.test(input);
        },
        minValue: minValue(0.01)
      },
      amount: {
        required,
        currency(input) {
          const value = input
            .toString()
            .replace(/\./g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return /^\$?([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)$/g.test(value);
        }
      },
      title: { required }
    },
    amountInt: {
      minValue: minValue(100)
    }
  },
  data() {
    return {
      isSwitchOn: {
        type: Boolean,
        default: true
      },
      fuelType: ["PERTALITE", "SOLAR", "PREMIUM"]
    };
  },
  computed: {
    ...mapGetters("transaction", ["fuel"]),
    fuelAmount: {
      set(newValue) {
        this.fuel.amount = newValue;
      },
      get() {
        return this.fuel.amount
          .toString()
          .replace(/\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    totalPrice() {
      const value = (this.formatAmountToInt * this.fuel.liters).toFixed(2);
      if (value.includes("e")) {
        return value || 0;
      }
      return value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0;
    },
    formatAmountToInt() {
      return this.fuel.amount ? this.amountInt : "";
    },
    amountInt() {
      return typeof this.fuel.amount === "string"
        ? parseInt(this.fuel.amount.split(".").join(""))
        : this.fuel.amount;
    },
    currentDateTime() {
      return new Date().toISOString();
    },
    formatDate: {
      set(newValue) {
        this.fuel.date = newValue;
      },
      get() {
        return this.fuel.date ? new Date(this.fuel.date).toISOString() : "";
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction", "setFormEmpty"]),
    ...mapActions("notification", ["addNotification"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendFuelForm() {
      this.$v.fuel.$touch();
      if (!this.$v.fuel.$invalid) {
        this.reformatVolume();
        this.convertDateToEpoch();
        this.fuel.amount = this.amountInt * this.fuel.liters;
        return this.saveTransaction(this.fuel)
          .then(response => {
            const notification = {
              type: "success",
              message: "Fuel form has been submitted."
            };
            this.addNotification(notification);
          })
          .catch(error => {
            const notification = {
              type: "error",
              message:
                "Oops ! You're offline. We will send it back as soon as you're online."
            };
            this.addNotification(notification);
          });
      }
    },
    reformatVolume() {
      this.fuel.liters = parseFloat(this.fuel.liters);
    },
    convertDateToEpoch() {
      this.fuel.date = new Date(this.fuel.date).getTime();
    }
  }
};
