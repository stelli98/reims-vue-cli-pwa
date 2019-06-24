import { minLength, required } from "vuelidate/lib/validators";

export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      role: { required }
    }
  },
  props: {
    user: {
      type: Object,
      default: () => ({
        username: "",
        password: "",
        role: ""
      })
    }
  },
  data() {
    return {
      roles: ["ADMIN", "MEMBER"]
    };
  },
  methods: {
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
        // this.createUser(this.user);
        // this.$router.push({ name: 'user' });
      } else {
        console.log("error");
      }
    }
  }
};
