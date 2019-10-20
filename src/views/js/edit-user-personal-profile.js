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
      }
    }
  },
  data() {
    return {
      user: {
        username: "",
        dateOfBirth: "",
        gender: "",
        division: "",
        status: "",
        vehicle: {
          plateNumber: "",
          type: ""
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
    }
  }
};
