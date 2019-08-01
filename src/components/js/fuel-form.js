import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
const float = helpers.regex("decimal", /^[0-9]+([.][0-9]+)?$/);
const currency = helpers.regex(
  "numeric",
  /(\d{1,3}[.](\d{3}[.])*\d{3}|\d+)([,]\d{1,2})?$/
);

export default {
  components: { Datetime },
  validations: {
    fuel: {
      date: { required },
      fuelType: { required },
      liters: { required, float },
      amount: { required, currency },
      title: { required }
    }
  },
  data () {
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
      set (newValue) {
        this.fuel.amount = newValue.toString()
          .replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      get () {
        return this.fuel.amount
      }
    },
    totalPrice () {
      const value = (this.amountInt * this.fuel.liters).toFixed(2);
      if (value.includes("e")) {
        return value || 0
      }
      return value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0
    },
    amountInt () {
      if (this.fuel.amount) {
        console.log(this.fuel.amount)
        if (typeof this.fuel.amount === "string") {
          return parseInt(this.fuel.amount.split(".").join(""))
        } else {
          return this.fuel.amount
        }
      } else {
        return ""
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction", "setFormEmpty"]),
    ...mapActions("notification", [
      "addNotification",
    ]),
    toggle () {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendFuelForm () {
      this.$v.fuel.$touch();
      if (!this.$v.fuel.$invalid) {
        this.fuel.amount = parseInt(this.fuel.amount.toString().split(".").join(""))
        this.reformatVolume();
        return this.saveTransaction(this.fuel).then((response) => {
          console.log('fuel', response)
          const notification = {
            type: "success",
            message: "Fuel form has been submitted."
          };
          this.addNotification(notification)
        }).catch((error) => {
          console.log('error-fuel', error)
          const notification = {
            type: "error",
            message: "Oops ! You're offline. We will send it back as soon as you're online."
          };
          this.addNotification(notification)
        })
      } else {
        console.log("error");
      }
    },
    reformatVolume () {
      this.fuel.liters = parseFloat(this.fuel.liters)
    }
  },
  mounted () {
    // this.fuel.amount ? this.formatAmount() : "";
  }
};