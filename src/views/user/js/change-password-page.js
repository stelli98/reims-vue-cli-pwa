import { minLength, required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

const access = {
  admin: "user",
  user: "home"
};

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
  computed: {
    role() {
      return this.$route.query.role;
    }
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    submitChangePasswordForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        const payload = [
          this.role,
          {
            password: this.user.password
          }
        ];
        this.changePassword(payload);
        this.moveTo(access[this.role]);
      }
    }
  }
};
