import { minLength, sameAs, required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  methods: {
    ...mapActions("user", ["updateUser"]),
    moveTo() {
      this.$router.push({ name: "home" });
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        console.log(this.user);
        this.updateUser(this.user);
        this.moveTo();
      } else {
        console.log("error");
      }
    }
  }
};
