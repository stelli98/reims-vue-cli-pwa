import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) }
    }
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["login"]),
    submitLoginForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.login(this.user);
        this.$router.push({ name: "home" });
      } else {
        console.log("error");
      }
    }
  }
};
