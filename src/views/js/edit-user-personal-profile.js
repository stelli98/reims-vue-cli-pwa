import { minLength, required, requiredIf } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      role: { required },
      dateOfBirth: { required },
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
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"],
      roleType: ["USER", "ADMIN"]
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    currentDateTime() {
      return new Date().toISOString();
    },
    userId() {
      return this.$route.params.id;
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
    ...mapActions("user", ["getUser", "updateUser"]),
    sendEditUserForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
        this.updateUser(this.user);
        this.moveToPreviousPage();
      }
    },
    checkUserHaveVehicle() {
      if (!!this.user.vehicle) {
        this.user.license = ""
        this.user.vehicle = ""
      }
    },
    moveToPreviousPage(){
      return this.$router.go(-1)
    }
  },
  created() {
    this.getUser(this.userId).then(() => this.checkUserHaveVehicle());
  }
};
