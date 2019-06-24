import { minLength, sameAs, required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAsPassword: sameAs("password") }
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        confirmPassword: "",
        password: ""
      })
    }
  },
  methods: {
    ...mapActions("user", ["changePassword"]),
    moveTo() {
      this.$router.go(-1);
    },
    getUserDetail() {
      this.$route.params.id
        ? Object.assign(this.user, this.getUser(this.$route.params.id))
        : "";
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        console.log(this.user);
        this.changePassword(this.user);
        // this.$router.push({ name: 'user' });
      } else {
        console.log("error");
      }
    }
  }
};
