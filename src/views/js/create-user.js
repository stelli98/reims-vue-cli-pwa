import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions } from "vuex";
export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      gender: { required },
      division: { required }
    },
    vehicle: {
      plateNumber: { required },
      type: { required }
    }
  },
  data() {
    return {
      userHaveVehicle: "no",
      user: {
        username: "",
        dateOfBirth: "",
        gender: "",
        division: ""
      },
      vehicle: {
        plateNumber: "",
        type: ""
      },
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"]
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
        return this.user.dateOfBirth ? new Date(this.user.dateOfBirth).toISOString() : "";
      }
    }
  },
  methods: {
    ...mapActions("user", ["createUser"]),
    moveTo(page) {
      this.$router.push({ name: page });
    },
    sendCreateUserForm() {
      this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
      this.createUser(this.user);
      this.moveTo('user')
    },
    validateUserForm() {
      this.$v.user.$touch();
      if (this.isShowingVehicleField) {
        this.$v.vehicle.$touch();
        this.user.vehicle = this.vehicle;
        if (!this.$v.user.$invalid && !this.$v.vehicle.$invalid) {
          this.sendCreateUserForm();
        }
      } else {
        if (!this.$v.user.$invalid) {
          this.sendCreateUserForm();
        }
      }
    }
  }
};
