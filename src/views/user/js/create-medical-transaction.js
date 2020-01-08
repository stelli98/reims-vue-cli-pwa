import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";
import { Datetime } from "vue-datetime";
import { Carousel, Slide } from "vue-carousel";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

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
      familyOptions: [],
      medical: {
        date: "",
        title: "",
        amount: 100,
        attachment: "",
        patient: { id: 0 }
      }
    };
  },
  computed: {
    ...mapGetters("user", ["userFamilies"]),
    ...mapGetters("auth", ["username"]),
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
      this.images.length === 0 && this.moveTo("home");
    },
    familyData() {
      const mySelf = {
        name: this.username,
        relationship: "My Self",
        id: 0
      };
      this.familyOptions = this.userFamilies.concat(mySelf);
      return this.familyOptions;
    }
  },
  methods: {
    ...mapActions("user", ["getUserFamilyDetailByUserId"]),
    ...mapActions("transaction", ["createMedicalTransaction"]),
    submitMedicalForm() {
      this.$v.medical.$touch();
      if (!this.$v.medical.$invalid) {
        this.convertDateToEpoch();
        this.medical.amount = this.convertAmountToInt();
        this.medical.attachment = this.images;
        this.medical.patient = this.isCurrentUserIsPatient();
        console.log(this.medical)
        this.createMedicalTransaction(this.medical);
        this.moveTo("home");
      }
    },
    convertDateToEpoch() {
      this.medical.date = new Date(this.medical.date).getTime();
    },
    convertAmountToInt() {
      return typeof this.medical.amount === "string"
        ? parseInt(this.medical.amount.split(".").join(""))
        : this.medical.amount;
    },
    formatfamilyNameAndRelationship(name, relationship) {
      return `${name}-${relationship}`;
    },
    isCurrentUserIsPatient() {
      const id = this.medical.patient.id;
      return id === 0
        ? null
        : this.familyOptions.find(family => family.id === id);
    }
  },
  created() {
    this.isImagesExist;
    this.getUserFamilyDetailByUserId("1559058600");
  }
};
