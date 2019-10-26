import { Datetime } from "vue-datetime";
export default {
  components: { Datetime },
  data() {
    return {
      userHaveVehicle: "no",
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
        return this.user.dateOfBirth
          ? new Date(this.user.dateOfBirth).toISOString()
          : "";
      }
    }
  },
  methods: {
    moveTo(page) {
      this.$router.push({ name: page });
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
