import { minLength, required, requiredIf } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/GlobalHeader");
export default {
  mixins: [CommonMixins],
  components: { Datetime , GlobalHeader},
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
      if (!!!this.user.vehicle) {
        this.user.license = ""
        this.user.vehicle = ""
      }
    }
  },
  created() {
    this.getUser(this.id).then(() => this.checkUserHaveVehicle());
  }
};
