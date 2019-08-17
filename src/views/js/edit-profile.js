import { minLength, sameAs, required } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) }
    },
    confirmPassword: {
      required
    }
  },
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
      confirmPassword: ""
    };
  },
  computed: {
    ...mapGetters("auth", ["username"]),
    sameAsPassword () {
      return this.user.password ? this.user.password != this.confirmPassword : false
    }
  },
  methods: {
    ...mapActions("user", ["updatePersonalProfile"]),
    ...mapActions("auth", ["updateToken"]),
    moveTo () {
      this.$router.push({ name: "home" });
    },
    submitForm () {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.updatePersonalProfile(this.user).then((response) => {
          console.log(response.headers)
          this.updateToken(response.headers.Authorization)
        })
        this.moveTo();
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this.user.username = this.username
    })
  }
};
