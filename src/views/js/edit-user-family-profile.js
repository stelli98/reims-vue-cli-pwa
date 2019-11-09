import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    userFamily: {
      name: { required, minLength: minLength(3) },
      dateOfBirth: { required }
    }
  },
  computed: {
    ...mapGetters("user", ["userFamily"]),
    userFamilyId() {
      return this.$route.params.id;
    },
    currentDateTime() {
      return new Date().toISOString();
    },
    formatDate: {
      set(newValue) {
        this.userFamily.dateOfBirth = newValue;
      },
      get() {
        return this.userFamily.dateOfBirth ? new Date(parseInt(this.userFamily.dateOfBirth)).toISOString() : "";
      }
    }
  },
  methods: {
    ...mapActions("user", ["updateUserFamily", "getUserFamilyDetailByFamilyId"]),
    moveToPreviousPage() {
      this.$router.go(-1)
    },
    convertToIsoString() {
      this.userFamily.dateOfBirth = new Date(parseInt(this.userFamily.dateOfBirth)).toISOString();
    },
    submitEditUserFamilyForm() {
      this.$v.userFamily.$touch();
      if (!this.$v.userFamily.$invalid) {
        this.userFamily.dateOfBirth = new Date(this.userFamily.dateOfBirth).getTime();
        this.updateUserFamily([this.userFamilyId, this.userFamily]);
        this.moveToPreviousPage();
      } 
    }
  },
  created() {
    this.getUserFamilyDetailByFamilyId(this.userFamilyId)
  }
};
