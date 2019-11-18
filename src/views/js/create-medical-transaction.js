import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import { Datetime } from "vue-datetime";
import { Carousel, Slide } from "vue-carousel";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { Datetime, Carousel, Slide, GlobalHeader },
  validations: {
    medical: {
      date: { required },
      title: { required },
      patient: { required },
      amount: {
        required,
        currency(input) {
          const value = input
            .toString()
            .replace(/\./g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return /^\$?([0-9]{1,3}.([0-9]{3}.)*[0-9]{3}|[0-9]+)$/g.test(value);
        }
      }
    },
    amountInt: {
      minValue: minValue(100)
    }
  },
  data() {
    return {
      medical: {
        date: "",
        title: "",
        amount: "100",
        attachment: "",
        patient: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["userFamilies"]),
    ...mapGetters("auth", ["id"]),
    ...mapGetters("transaction", ["images"]),
    formatDate: {
      set(newValue) {
        this.medical.date = newValue;
      },
      get() {
        return this.medical.date
          ? new Date(this.medical.date).toISOString()
          : "";
      }
    },
    medicalAmount: {
      set(newValue) {
        this.medical.amount = newValue;
      },
      get() {
        return this.medical.amount
          .toString()
          .replace(/\./g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    isImagesExist() {
      this.images.length === 0 ? this.moveTo("home") : "";
    }
  },
  methods: {
    ...mapActions("user", ["getUserFamilyDetailByUserId"]),
    ...mapActions("transaction", ["createMedicalTransaction"]),
    submitMedicalForm() {
      this.$v.medical.$touch();
      if (!this.$v.medical.$invalid) {
        this.convertDateToEpoch();
        this.medical.attachment = this.images;
        this.createMedicalTransaction(this.medical);
        this.moveTo("home");
      }
    },
    convertDateToEpoch() {
      this.medical.date = new Date(this.medical.date).getTime();
    },
    formatfamilyNameAndRelationship(name, relationship) {
      return `${name}-${relationship}`;
    }
  },
  created() {
    this.isImagesExist;
    this.getUserFamilyDetailByUserId("1559058600");
  }
};
