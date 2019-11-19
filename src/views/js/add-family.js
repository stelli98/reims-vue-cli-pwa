import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";
const GlobalHeader = () => import("@/components/GlobalHeader");

export default {
  mixins: [CommonMixins],
  components: { Datetime, GlobalHeader},
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
      relationshipType : ["CHILDREN","SPOUSE"]
    };
  },
  computed: {
    ...mapGetters("user", ["userFamilies"]),
    formatDate: {
      set(newValue) {
        this.family.dateOfBirth = newValue;
      },
      get() {
        return this.family.dateOfBirth
          ? new Date(this.family.dateOfBirth).toISOString()
          : "";
      }
    }
  },
  methods: {
    ...mapActions("user", ["addFamilyToUser"]),
    submitAddFamilyToUserForm() {
      this.$v.family.$touch();
      if (!this.$v.family.$invalid) {
        this.family.dateOfBirth = new Date(this.family.dateOfBirth).getTime();
        this.addFamilyToUser([this.userId, this.family]);
        this.moveToWithParamsRouteId('user-detail')
      }
    }
  }
};
