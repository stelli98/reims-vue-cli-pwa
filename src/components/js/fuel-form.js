import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
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
    ...mapState("transaction", ["fuel", "OCRResultImage"]),
    totalPrice () {
      const value = (this.fuel.amount * this.fuel.volume).toFixed(2);
      if (value.includes("e")) {
        return value || 0
      }
      return value.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0
    },
    amountInt () {
      return typeof this.fuel.amount == "string" ? parseInt(this.fuel.amount.split(".").join("")) : this.fuel.amount
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
        this.reformatAmount();
        console.log(this.fuel.amount)
        this.fuel.image = this.OCRResultImage;
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
    formatAmount () {
      this.fuel.amount = this.fuel.amount
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatAmount () {
      this.fuel.amount = parseInt(this.fuel.amount.split(".").join(""));
    }
  },
  mounted () {
    // this.formatAmount();
  }
};