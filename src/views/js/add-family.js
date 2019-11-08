import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    family: {
      $each: {
        name: { required, minLength: minLength(3) },
        relationship: { required },
        dateOfBirth: { required }
      }
    }
  },
  data() {
    return {
      family: [],
      childrenData: {
        name: "",
        relationship: "CHILDREN",
        dateOfBirth: ""
      },
      spouseData: {
        name: "",
        relationship: "SPOUSE",
        dateOfBirth: ""
      }
    };
  },
  computed: {
    ...mapGetters("user", ["userFamilies"]),
    currentDateTime() {
      return new Date().toISOString();
    },
    userId() {
      return this.$route.params.id;
    },
    maxFamilyField() {
      return 4 - this.userFamilies.length;
    },
    isSpouseDataAvailable() {
      return this.userFamilies.find(user => user.relationship == "SPOUSE");
    }
  },
  methods: {
    ...mapActions("user", ["addFamilyToUser", "getUserFamilyDetailByUserId"]),
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
      this.family.splice(index, 1);
    },
    submitAddFamilyToUserForm() {
      this.$v.family.$touch();
      if (!this.$v.family.$invalid) {
        let familyRawData = JSON.parse(JSON.stringify(this.family));
        let familyData = this.convertDateToEpoch(familyRawData);
        this.addFamilyToUser(familyData);
      }
    },
    convertDateToEpoch(familyData) {
      familyData.map(family => {
        family.dateOfBirth = new Date(family.dateOfBirth).getTime();
      });
      return familyData;
    },
    checkUserFamilyData() {
      !!this.isSpouseDataAvailable
        ? this.family.push({
            name: "",
            relationship: "CHILDREN",
            dateOfBirth: ""
          })
        : this.family.push({
            name: "",
            relationship: "SPOUSE",
            dateOfBirth: ""
          });
    }
  },
  created() {
    this.getUserFamilyDetailByUserId(this.userId).then(() => {
      this.checkUserFamilyData();
    });
  }
};
