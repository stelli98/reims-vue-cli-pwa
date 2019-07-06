import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapState } from "vuex";

const access = {
  ADMIN: "user",
  USER: "home"
};

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
  computed: mapState("auth", ["authUser"]),
  methods: {
    ...mapActions("auth", ["login"]),
    submitLoginForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.login(this.user).then(() => {
          this.$router.push({ name: access[this.authUser.role] });
        });
      } else {
        console.log("error");
      }
    }
  }
};
