import { minLength, required, requiredIf } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");
export default {
  mixins: [CommonMixins],
  components: { Datetime, GlobalHeader },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
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
      userHaveVehicle: null,
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"]
    };
  },
  computed: {
    ...mapGetters("admin", ["user"]),
    isShowingVehicleField() {
      return this.userHaveVehicle === "yes";
    },
    formatDate: {
      set(newValue) {
        this.user.dateOfBirth = newValue;
      },
      get() {
        return this.user.dateOfBirth
          ? new Date(this.user.dateOfBirth).toISOString()
          : this.minDateOfBirth;
      }
    }
  },
  methods: {
    ...mapActions("admin", ["getUser", "updateUser"]),
    sendEditUserForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
        if (!this.isShowingVehicleField) {
          this.user.vehicle = "";
          this.user.license = "";
        }
        this.updateUser(this.user).then(() =>
          this.$router.push({
            name: "user-detail",
            params: { id: this.user.id },
            query: { activeTab: "UserPersonalDetail" }
          })
        );
      }
    },
    checkUserHaveVehicle() {
      this.getUser(this.id).then(
        () =>
          (this.userHaveVehicle =
            this.user.vehicle && this.user.license ? "yes" : "no")
      );
    }
  },
  created() {
    this.checkUserHaveVehicle();
  }
};
