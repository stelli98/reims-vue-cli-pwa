import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
const currency = helpers.regex(
  "numeric",
  /(\d{1,3}[.](\d{3}[.])*\d{3}|\d+)([,]\d{1,2})?$/
);

export default {
  components: { Datetime },
  validations: {
    parking: {
      in: { required },
      out: { required },
      price: { required, currency },
      title: { required },
      vehicle: { required },
      license: { required },
      location: { required }
    }
  },
  data() {
    return {
      isSwitchOn: {
        type: Boolean,
        default: true
      },
      vehicleType: ["Bus", "Car", "Motorcycle", "Van"]
    };
  },
  computed: {
    ...mapState("transaction", ["parking"])
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendParkingForm() {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        this.saveTransaction(this.parking);
        console.log(this.parking);
        this.$router.push({ name: "home" });
      } else {
        console.log("error");
      }
    },
    formatPrice() {
      this.$v.parking.price.$touch();
      this.parking.price = this.parking.price
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatPrice() {
      this.parking.price = parseInt(this.parking.price.split(".").join(""));
    }
  },
  mounted() {
    this.formatPrice();
  }
};
