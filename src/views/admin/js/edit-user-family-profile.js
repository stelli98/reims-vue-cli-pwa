import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

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
    ...mapGetters("admin", ["userFamily"]),
    formatDate: {
      set(newValue) {
        this.userFamily.dateOfBirth = newValue;
      },
      get() {
        return this.userFamily.dateOfBirth
          ? new Date(this.userFamily.dateOfBirth).toISOString()
          : this.minDateOfBirth;
      }
    }
  },
  methods: {
    ...mapActions("admin", [
      "updateUserFamily",
      "getUserFamilyDetailByFamilyId"
    ]),
    submitEditUserFamilyForm() {
      this.$v.userFamily.$touch();
      if (!this.$v.userFamily.$invalid) {
        this.userFamily.dateOfBirth = new Date(
          this.userFamily.dateOfBirth
        ).getTime();
        this.updateUserFamily(this.userFamily).then(() => {
          this.$router.push({
            name: "user-detail",
            params: { id: this.$route.params.userId },
            query: { activeTab: "UserFamilyDetail" }
          });
        });
      }
    }
  },
  created() {
    this.getUserFamilyDetailByFamilyId(this.$route.params.familyId);
  }
};
