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
    ...mapGetters("user", ["userFamily"]),
    currentDateTime() {
      return new Date().toISOString();
    },
    userId() {
      return this.$route.params.id;
    },
    maxFamilyField() {
      return 4 - this.userFamily.length;
    },
    isSpouseDataAvailable(){
      return this.userFamily.find(user=> user.relationship == "SPOUSE")
    }
  },
  methods: {
    ...mapActions("user", ["addFamilyToUser", "getUserFamilyDetail"]),
    submitChangePasswordForm() {
      this.moveTo("user");
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    addFamilyField() {
      if (this.family.length < this.maxFamilyField) {
        this.family.push(this.childrenData);
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
      return familyData
    },
    checkUserFamilyData() {
      !!this.isSpouseDataAvailable
        ? this.family.push(this.childrenData)
        : this.family.push(this.spouseData);
    }
  },
  created() {
    this.getUserFamilyDetail(this.userId).then(() => {
      this.checkUserFamilyData();
    });
  }
};
