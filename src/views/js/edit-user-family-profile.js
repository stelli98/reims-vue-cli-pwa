import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/GlobalHeader");

export default {
  mixins: [CommonMixins],  
  components: { Datetime, GlobalHeader },
  validations: {
    userFamily: {
      name: { required, minLength: minLength(3) },
      dateOfBirth: { required }
    }
  },
  computed: {
    ...mapGetters("user", ["userFamily"]),
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
    submitEditUserFamilyForm() {
      this.$v.userFamily.$touch();
      if (!this.$v.userFamily.$invalid) {
        this.userFamily.dateOfBirth = new Date(this.userFamily.dateOfBirth).getTime();
        this.updateUserFamily([this.id, this.userFamily]);
        this.moveToPreviousPage();
      } 
    }
  },
  created() {
    this.getUserFamilyDetailByFamilyId(this.id)
  }
};
