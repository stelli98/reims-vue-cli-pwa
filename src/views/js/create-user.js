import { minLength, required, requiredIf } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions } from "vuex";
export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      password: { required, minLength: minLength(6) },
      role: { required },
      gender: { required },
      division: { required },
      license: {
        required: requiredIf(function() {
          return this.isShowingVehicleField;
        })
      },
      vehicle: {
        required: requiredIf(function() {
          return this.isShowingVehicleField;
        })
      }
    }
  },
  data() {
    return {
      userHaveVehicle: "no",
      user: {
        username: "",
        dateOfBirth: "",
        password: "",
        role: "",
        gender: "",
        division: "",
        license: "",
        vehicle: ""
      },
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"],
      roleType: ["USER", "ADMIN"]
    };
  },
  computed: {
    currentDateTime() {
      return new Date().toISOString();
    },
    isShowingVehicleField() {
      return this.userHaveVehicle == "yes";
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
    ...mapActions("user", ["createUser"]),
    moveTo(page) {
      this.$router.push({ name: page });
    },
    sendCreateUserForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
        this.createUser(this.user);
        this.moveTo("user");
      }
    }
  }
};
