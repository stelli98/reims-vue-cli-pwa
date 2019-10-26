import { minLength, required, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
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
    userId() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    submitChangePasswordForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.changePassword(this.userId, this.user);
        this.moveTo("user-detail");
      }
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    }
  }
};
