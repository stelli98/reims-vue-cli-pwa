import { mapActions, mapGetters } from "vuex";
import { minLength, required } from "vuelidate/lib/validators";

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
    ...mapGetters("user", ["user"]),
    userId() {
      return this.$route.params.id;
    },
    formTitle() {
      return this.userId ? "Edit User" : "Create User";
    },
    userTemp() {
      return {
        username: "",
        password: "",
        role: ""
      };
    }
  },
  methods: {
    ...mapActions("user", ["updateUser", "createUser", "getUser", "emptyUser"]),
    moveTo() {
      this.$router.push({ name: "user" });
    },
    submitForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.sendForm().then(() => {
          this.$router.push({ name: "user" });
        });
      }
    },
    checkActionForm() {
      this.userId ? this.getUser(this.userId) : this.emptyUser(this.userTemp);
    },
    sendForm() {
      return this.userId
        ? this.updateUser(this.user)
        : this.createUser(this.user);
    }
  },
  mounted() {
    this.checkActionForm();
  }
};
