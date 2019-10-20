import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions } from "vuex";

export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      gender: { required },
      division: { required },
      status: { required },
      vehicle: {
        plateNumber: { required },
        type: { required }
      }
    },
    userFamily: {
      name: { required , minLength: minLength(3)},
      relationship: { required },
      dateOfBirth: { required },
      $each: {
        name: { required , minLength: minLength(3)},
        relationship: { required },
        dateOfBirth: { required }
      }
    }
  },
  data() {
    return {
      isExpandedFamily: true,
      isExpandedPersonal: true,
      user: {
        username: "",
        dateOfBirth: "",
        gender: "",
        division: "",
        status: "",
        vehicle: {
          plateNumber: "",
          type: ""
        },
        family: []
      },
      userFamily: [],
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"],
      statusType: ["MARRIED", "SINGLE"],
      showFamilyField: false,
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
    currentDateTime() {
      return new Date().toISOString();
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
    }
  },
  methods: {
    ...mapActions("user", ["createUser"]),
    submitChangePasswordForm() {
      this.moveTo("user");
    },
    moveTo(page) {
      this.$router.push({ name: page, params: { id: this.userId } });
    },
    addFamilyField(familyData) {
      if (this.userFamily.length < 4) {
        this.userFamily.push(familyData);
      }
    },
    removeFamilyField(index) {
      this.userFamily.splice(index, 1);
    },
    toggleExpandFamilyData() {
      this.isExpandedFamily = !this.isExpandedFamily
    },
    toggleExpandPersonalData(){
      this.isExpandedPersonal = !this.isExpandedPersonal
    },
    sendCreateUserForm(){
      this.convertDateToEpoch()
      this.createUser(this.user)
      this.moveTo('user')
    },
    convertDateToEpoch(){
      this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime()
      this.userFamily.map( user => {
        user.dateOfBirth = new Date(user.dateOfBirth).getTime()
        return user
      })
      this.user.family  = [...this.userFamily]
    }
  },
  watch: {
    "user.status"(value) {
      if (value === "MARRIED") {
        if (this.userFamily.length == 0) {
          this.addFamilyField(this.spouseData);
        }
        this.showFamilyField = true;
      } else {
        this.showFamilyField = false;
        this.userFamily = []
      }
    }
  }
};
