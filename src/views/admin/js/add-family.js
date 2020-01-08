import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { Datetime, GlobalHeader },
  validations: {
    family: {
      name: { required, minLength: minLength(3) },
      relationship: { required },
      dateOfBirth: { required }
    }
  },
  data() {
    return {
      family: {
        name: "",
        relationship: "",
        dateOfBirth: ""
      },
      relationshipType: ["CHILDREN", "SPOUSE"]
    };
  },
  computed: {
    ...mapGetters("admin", ["userFamilies"]),
    formatDate: {
      set(newValue) {
        this.family.dateOfBirth = newValue;
      },
      get() {
        return this.family.dateOfBirth
          ? new Date(this.family.dateOfBirth).toISOString()
          : this.minDateOfBirth;
      }
    }
  },
  methods: {
    ...mapActions("admin", ["addFamilyToUser"]),
    submitAddFamilyToUserForm() {
      this.$v.family.$touch();
      if (!this.$v.family.$invalid) {
        this.family.dateOfBirth = new Date(this.family.dateOfBirth).getTime();
        this.addFamilyToUser([this.id, this.family]).then(() =>
          this.moveToWithParamsRouteId("user-detail")
        );
      }
    }
  }
};
