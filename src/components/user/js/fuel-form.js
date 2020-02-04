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
      kilometers: {
        required,
        minValue: minValue(1)
      },
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
      title: { required },
      location: { required }
    },
    amountInt: {
      minValue: minValue(100)
    }
  },
  data() {
    return {
      fuelTypeOptions: ["PERTALITE", "SOLAR", "PREMIUM"]
    };
  },
  props: ["bus"],
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
    },
    fuelTemplate() {
      return {
        data: {
          category: "FUEL",
          date: "",
          fuelType: "",
          kilometers: 1,
          liters: 1,
          amount: 100,
          title: "",
          location: ""
        }
      };
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction", "setFormEmpty"]),
    ...mapActions("notification", ["addNotification"]),
    sendFuelForm() {
      this.$v.fuel.$touch();
      if (!this.$v.fuel.$invalid) {
        this.fuel.date = new Date(this.fuel.date).getTime();
        this.fuel.amount = this.amountInt;
        this.fuel.liters = parseFloat(this.fuel.liters);
        this.fuel.kilometers = parseInt(this.fuel.kilometers);
        this.saveTransaction(this.fuel)
          .then(() => {
            const notification = {
              type: "success",
              message: "Fuel form has been submitted."
            };
            this.addNotification(notification);
          })
          .catch(() => {
            const notification = {
              type: "error",
              message:
                "Oops ! You're offline. We will send it back as soon as you're online."
            };
            this.addNotification(notification);
          });
        this.setFormEmpty(this.fuelTemplate);
        this.$router.push({ name: "home" });
      }
    }
  },
  mounted() {
    this.bus.$on("submitFuelForm", this.sendFuelForm);
  }
};
