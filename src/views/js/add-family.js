import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    family: {
      name: { required, minLength: minLength(3) },
      relationship: { required },
      dateOfBirth: { required },
      $each: {
        name: { required, minLength: minLength(3) },
        relationship: { required },
        dateOfBirth: { required }
      }
    }
  },
  data() {
    return {
      family: [
        {
          name: "",
          relationship: "CHILDREN",
          dateOfBirth: ""
        }
      ],
    };
  },
  computed: {
    ...mapGetters("user", ["userFamily"]),
    currentDateTime() {
      return new Date().toISOString();
    },
    userId() {
      return this.$route.params.id;
    },
    formatDate: {
      set(newValue) {
        this.user.dateOfBirth = newValue;
      },
      get() {
        return this.user.dateOfBirth
          ? new Date(this.user.dateOfBirth).toISOString()
          : "";
      }
    },
    maxFamilyField() {
      return 4 - this.userFamily.length;
    }
  },
  methods: {
    ...mapActions("user", ["createUser", "getUserFamilyDetail"]),
    submitChangePasswordForm() {
      this.moveTo("user");
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    addFamilyField() {
      if (this.family.length < this.maxFamilyField) {
        this.family.push({
            name: "",
            relationship: "CHILDREN",
            dateOfBirth: ""
          });
      }
    },
    removeFamilyField(index) {
        console.log(index)
      this.family.splice(index, 1);
    },
    sendCreateUserForm() {
      this.convertDateToEpoch();
      this.createUser(this.user);
      this.moveTo("user");
    },
    convertDateToEpoch() {
      this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
      this.userFamily.map(user => {
        user.dateOfBirth = new Date(user.dateOfBirth).getTime();
        return user;
      });
      this.user.family = [...this.userFamily];
    }
  },
  created() {
    this.getUserFamilyDetail(this.userId);
  }
};
