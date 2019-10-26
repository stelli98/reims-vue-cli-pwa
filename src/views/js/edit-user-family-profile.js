import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    userFamily: {
      $each: {
        name: { required, minLength: minLength(3) },
        dateOfBirth: { required },
        relationship: { }
      }
    }
  },
  data() {
    return {
      expandedGroup: []
    };
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
    ...mapActions("user", ["updateUserFamily", "getUserFamilyDetail"]),
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    convertToIsoString() {
      this.userFamily.forEach(x => {
        x.dateOfBirth = new Date(parseInt(x.dateOfBirth)).toISOString();
      });
    },
    submitEditUserFamilyForm() {
      this.$v.userFamily.$touch();
      if (!this.$v.userFamily.$invalid) {
        let familyRawData = JSON.parse(JSON.stringify(this.userFamily));
        let familyData = this.convertDateToEpoch(familyRawData);
        this.updateUserFamily([this.userId, familyData]);
      } else {
        this.expandInvalidField();
      }
    },
    expandInvalidField() {
      this.userFamily.forEach((user, index) => {
        if (
          this.$v.userFamily.$each[index].dateOfBirth.$invalid ||
          this.$v.userFamily.$each[index].name.$invalid
        ) {
          this.toggleExpandFamilyData(index);
        }
      });
    },
    convertDateToEpoch(familyData) {
      familyData.map(family => {
        family.dateOfBirth = new Date(family.dateOfBirth).getTime();
      });
      return familyData;
    },
    removeFamilyField(index) {
      this.userFamily.splice(index, 1);
    },
    toggleExpandFamilyData(index) {
      if (this.isExpandedGroup(index)) {
        this.expandedGroup.splice(this.expandedGroup.indexOf(index), 1);
      } else {
        this.expandedGroup.push(index);
      }
    },
    isExpandedGroup(index) {
      return this.expandedGroup.indexOf(index) !== -1;
    }
  },
  created() {
    this.getUserFamilyDetail(this.userId).then(() => this.convertToIsoString());
  }
};
