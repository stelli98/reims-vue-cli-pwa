import { mapActions, mapState } from "vuex";
import { minLength, required } from "vuelidate/lib/validators";

const user = {
  username: "",
  password: "",
  role: ""
};

export default {
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(6) },
      role: { required }
    }
  },
  data() {
    return {
      roles: ["ADMIN", "USER"]
    };
  },
  computed: {
    ...mapState("user", ["user"]),
    userId() {
      return this.$route.params.id | "";
    }
  },
  methods: {
    ...mapActions("user", ["updateUser", "createUser", "getUser", "emptyUser"]),
    moveTo() {
      this.$router.go(-1);
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.sendForm();
        this.$router.push({ name: "user" });
      } else {
        console.log("error");
      }
    },
    checkActionForm() {
      this.userId ? this.getUser(this.userId) : this.emptyUser(user);
    },
    sendForm() {
      this.userId ? this.updateUser(this.user) : this.createUser(this.user);
    }
  },
  mounted() {
    this.checkActionForm();
  }
};
