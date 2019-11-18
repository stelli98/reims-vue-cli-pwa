import { minLength, required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: {GlobalHeader},
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs("password") }
    }
  },
  data() {
    return {
      user: {
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    submitChangePasswordForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.changePassword(this.userId, this.user);
        this.moveTo("user-detail");
      }
    }
  }
};
