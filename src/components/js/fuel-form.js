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
      unitPrice: { required, currency },
      title: { required }
    }
  },
  data() {
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
    totalPrice() {
      const value = (this.unitPrice * this.fuel.volume).toString();
      if (value.includes("e")) {
        return value;
      }
      return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    unitPrice() {
      if (typeof this.fuel.unitPrice === "string") {
        return parseInt(this.fuel.unitPrice.split(".").join(""));
      } else {
        return this.fuel.unitPrice;
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendFuelForm() {
      this.$v.fuel.$touch();
      if (!this.$v.fuel.$invalid) {
        this.reformatUnitPrice();
        this.saveTransaction(this.fuel);
        console.log(this.fuel);
        this.$router.push({ name: "home" });
      } else {
        console.log("error");
      }
      console.log(this.fuel);
    },
    formatUnitPrice() {
      this.$v.fuel.unitPrice.$touch();
      this.fuel.unitPrice = this.fuel.unitPrice
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatUnitPrice() {
      this.fuel.unitPrice = parseInt(this.fuel.unitPrice.split(".").join(""));
    }
  },
  mounted() {
    this.formatUnitPrice();
  }
};
