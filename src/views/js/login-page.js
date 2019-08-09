import { required, minLength } from "vuelidate/lib/validators";
import { mapActions, mapGetters } from "vuex";

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
      },
      access: {
        ADMIN: "user",
        USER: "home"
      }
    };
  },
  computed: mapGetters("auth", ["role"]),
  methods: {
    ...mapActions("auth", ["login"]),
    submitLoginForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.login(this.user).then(() => {
          this.$router.push({ name: access[this.role] });
        });
      } else {
        console.log("error");
      }
    }
  }
};
