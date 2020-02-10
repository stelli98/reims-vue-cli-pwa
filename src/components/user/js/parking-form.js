import { required, minValue } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";
import { Datetime } from "vue-datetime";

export default {
  components: { Datetime },
  validations: {
    parking: {
      date: { required },
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
      location: {required}
    },
    amountInt: {
      minValue: minValue(100)
    }
  },
  props: [
    'bus'
  ],
  computed: {
    ...mapGetters("transaction", ["parking"]),
    parkingAmount: {
      set(newValue) {
        this.parking.amount = newValue;
      },
      get() {
        return this.parking.amount
          .toString()
          .replace(/\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    amountInt() {
      return typeof this.parking.amount === "string"
        ? parseInt(this.parking.amount.split(".").join(""))
        : this.parking.amount;
    },
    formatDate: {
      set(newValue) {
        this.parking.date = newValue;
      },
      get() {
        return this.parking.date
          ? new Date(this.parking.date).toISOString()
          : "";
      }
    },
    currentDateTime() {
      return new Date().toISOString();
    },
    parkingTemplate () {
      return {
        data: {
          category: "PARKING",
          date: "",
          amount: 100,
          title: "",
          location:""
        }
      };
    },
  },
  methods: {
    ...mapActions("transaction", ["saveTransaction","setFormEmpty"]),
    ...mapActions("notification", ["addNotification"]),
    sendParkingForm() {
      this.$v.parking.$touch();
      if (!this.$v.parking.$invalid) {
        this.reformatPrice();
        this.convertDateToEpoch();
        this.saveTransaction(this.parking)
          .then(response => {
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
          this.setFormEmpty(this.parkingTemplate);
          this.$router.push({ name: "home" , query:{category:"PARKING"}});
      }
    },
    reformatPrice() {
      this.parking.amount = this.amountInt;
    },
    convertDateToEpoch() {
      this.parking.date = new Date(this.parking.date).getTime();
    }
  },
  mounted () {
    this.bus.$on('submitParkingForm', this.sendParkingForm);
  },
};
