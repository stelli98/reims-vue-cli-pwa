import { minLength, required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { GlobalHeader },
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
        const payload = [
          this.$route.query.role,
          {
            password: this.user.password
          }
        ];
        this.changePassword(payload);
        this.moveTo("user-detail");
      }
    }
  }
};
