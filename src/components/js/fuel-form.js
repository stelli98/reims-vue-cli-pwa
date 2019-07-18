import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
const float = helpers.regex("numeric", /\d*\.?\d*$/);
const currency = helpers.regex(
  "numeric",
  /(\d{1,3}[.](\d{3}[.])*\d{3}|\d+)([,]\d{1,2})?$/
);

export default {
  components: { Datetime },
  validations: {
    fuel: {
      date: { required },
      type: { required },
      volume: { required, float },
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
      fuelType: ["Pertalite", "Pertamax", "Premium", "Solar"]
    };
  },
  computed: {
    ...mapState("transaction", ["fuel"]),
    totalPrice () {
      const value = (this.amount * this.fuel.volume).toString();
      if (value.includes("e")) {
        return value;
      }
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    unitPrice () {
      if (typeof this.fuel.amount === "string") {
        return parseInt(this.fuel.amount.split(".").join(""));
      } else {
        return this.fuel.amount;
      }
    },
    fuelTemplate () {
      return {
        data: {
          date: "",
          type: "",
          volume: 0,
          unitPrice: 0,
          title: "",
          category: "FUEL"
        }
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
        this.reformatUnitPrice();
        return this.saveTransaction(this.fuel).then(() => {
          const notification = {
            type: "success",
            message: "Fuel form has been submitted."
          };
          this.addNotification(notification)
        }).catch(() => {
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
    formatUnitPrice () {
      this.$v.fuel.unitPrice.$touch();
      this.fuel.amount = this.fuel.amount
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatUnitPrice () {
      this.fuel.amount = parseInt(this.fuel.amount.split(".").join(""));
    },
    clearFuelForm () {
      this.fuel = {
        date: "",
        type: "",
        volume: 0,
        unitPrice: 0,
        title: ""
      }
    }
  },
  mounted () {
    console.log(this.fuel)
    this.formatUnitPrice();
  }
};