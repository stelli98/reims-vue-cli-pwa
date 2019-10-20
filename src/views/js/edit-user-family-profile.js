import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    userFamily: {
      name: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      $each: {
        name: { required, minLength: minLength(3) },
        dateOfBirth: { required }
      }
    }
  },
  computed: {
    ...mapGetters("user", ["userFamily"]),
    userId() {
      return this.$route.params.id;
    },
    currentDateTime() {
      return new Date().toISOString();
    }
  },
  methods: {
    ...mapActions("user", ["getUserFamilyDetail"]),
    submitChangePasswordForm() {
      this.moveTo("user");
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    convertToIsoString() {
      this.userFamily.forEach(x => {
        x.dateOfBirth = new Date(parseInt(x.dateOfBirth)).toISOString();
      });
    },
    test() {
      this.convertToIsoString();
    }
  },
  created() {
    this.getUserFamilyDetail(this.userId)
    .then(() => this.convertToIsoString());
  }
};
