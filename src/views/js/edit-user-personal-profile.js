import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";

export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      gender: { required },
      division: { required },
      status: { required },
      vehicle: {
        plateNumber: { required },
        type: { required }
      },
      family: {
        name: { required, minLength: minLength(3) },
        relationship: { required },
        dateOfBirth: { required }
      }
    }
  },
  data() {
    return {
      isExpandedFamily: true,
      isExpandedPersonal: true,
      showFamilyField: false,
      user: {
        username: "",
        dateOfBirth: "",
        gender: "",
        division: "",
        status: "",
        vehicle: {
          plateNumber: "",
          type: ""
        },
        family: {
          name: "",
          relationship: "SPOUSE",
          dateOfBirth: ""
        }
      },
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"],
      statusType: ["MARRIED", "SINGLE"]
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    currentDateTime() {
      return new Date().toISOString();
    },
    formatDate: {
      set(newValue) {
        this.user.dateOfBirth = newValue;
      },
      get() {
        return this.user.dateOfBirth
          ? new Date(this.user.dateOfBirth).toISOString()
          : "";
      }
    }
  },
  methods: {
    submitChangePasswordForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.changePassword(this.userId, this.user);
      }
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    toggleExpandFamilyData() {
      this.isExpandedFamily = !this.isExpandedFamily;
    },
    toggleExpandPersonalData(){
      this.isExpandedPersonal = !this.isExpandedPersonal
    }
  },
  watch: {
    "user.status"(value) {
      if (value === "MARRIED") {
        this.showFamilyField = true;
      } else {
        this.showFamilyField = false;
        this.user.family = {};
      }
    }
  }
};
