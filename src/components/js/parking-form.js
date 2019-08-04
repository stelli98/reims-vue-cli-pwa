import { required, minValue } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { Datetime } from "vue-datetime";

export default {
  components: { Datetime },
  validations: {
    parking: {
      date: { required },
      out: { required },
      amount: {
        required,
        currency(input) {
          return /^\$?([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)$/g.test(input);
        }
      },
      title: { required },
      parkingType: { required },
      license: { required },
      location: { required }
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
      type: ["BUS", "CAR", "MOTORCYCLE"]
    };
  },
  computed: {
    ...mapGetters("transaction", ["parking"]),
    parkingAmount: {
      set(newValue) {
        this.parking.amount = newValue
          .toString()
          .replace(/\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      get() {
        return this.parking.amount;
      }
    },
    amountInt() {
      return typeof this.parking.amount === "string"
        ? parseInt(this.parking.amount.split(".").join(""))
        : this.parking.amount;
    }
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction"]),
    ...mapActions("notification", ["addNotification"]),
    toggle() {
      this.isSwitchOn = !this.isSwitchOn;
    },
    sendParkingForm() {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        this.calculateDuration();
        this.convertDateToEpoch();
        return this.saveTransaction(this.parking)
          .then(response => {
            console.log(response);
            const notification = {
              type: "success",
              message: "Parking form has been submitted."
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
      } else {
        alert("error");
      }
    },
    reformatPrice() {
      this.parking.amount = this.amountInt;
    },
    calculateDuration() {
      this.parking.hours = Math.floor(
        (new Date(this.parking.out).getTime() -
          new Date(this.parking.date).getTime()) /
          3600000
      );
    },
    convertDateToEpoch() {
      this.parking.date = new Date(this.parking.date).getTime().toString();
    }
  }
};
