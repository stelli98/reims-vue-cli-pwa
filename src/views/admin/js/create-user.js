import {
  minLength,
  required,
  not,
  requiredIf,
  sameAs
} from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { Datetime, GlobalHeader },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      password: {
        required,
        minLength: minLength(6),
        isNotSameAsUsername: not(sameAs("username"))
      },
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
          : this.minDateOfBirth;
      }
    }
  },
  methods: {
    ...mapActions("admin", ["createUser"]),
    sendCreateUserForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
        this.createUser(this.user).then(() => {
          this.moveTo("user");
        });
      }
    }
  }
};
