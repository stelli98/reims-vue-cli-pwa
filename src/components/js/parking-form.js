import { helpers, numeric, required } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
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
      date: { required },
      out: { required },
      amount: { required, currency },
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
      vehicleType: ["Bus", "Car", "Motorcycle", "Van"],
    };
  },
  computed: {
    ...mapGetters("transaction", ["parking", "OCRResultImage"]),
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    ...mapActions("notification", ["addNotification"]),
    toggle () {
      this.isSwitchOn = !this.isSwitchOn;
    },
    async sendParkingForm () {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        this.parking.image = this.OCRResultImage;
        return this.saveTransaction(this.parking).then((response) => {
          console.log(response)
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
      this.$v.parking.amount.$touch();
      this.parking.amount = this.parking.amount
        .toString()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    reformatPrice () {
      this.parking.amount = parseInt(this.parking.amount.split(".").join(""));
    }
  },
  created () {
    console.log('mounted', this.parking)
    this.formatPrice();
  }
};
