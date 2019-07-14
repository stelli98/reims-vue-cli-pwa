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
  data () {
    return {
      isSwitchOn: {
        type: Boolean,
        default: true
      },
      vehicleType: ["Bus", "Car", "Motorcycle", "Van"]
    };
  },
  computed: {
    ...mapState("transaction", ["parking"]),
    parkingTemplate () {
      return {
        data: {
          in: "",
          out: "",
          price: 0,
          title: "",
          vehicle: "",
          license: "",
          location: "",
          category: "PARKING"
        }
      }
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    ...mapActions("notification", [
      "addNotification",
    ]),
    toggle () {
      this.isSwitchOn = !this.isSwitchOn;
    },
    async sendParkingForm () {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        return this.saveTransaction(this.parking).then(() => {
          const notification = {
            type: "success",
            message: "Parking form has been submitted."
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
        alert("error");
      }
    },
    formatPrice () {
      this.$v.parking.price.$touch();
      this.parking.price = this.parking.price
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatPrice () {
      this.parking.price = parseInt(this.parking.price.split(".").join(""));
    },
    clearParkingForm () {
      this.parking = {
        in: "",
        out: "",
        price: 0,
        title: "",
        vehicle: "",
        license: "",
        location: ""
      }
    }
  },
  mounted () {
    this.formatPrice();
  }
};
