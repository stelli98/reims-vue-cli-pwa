import { minLength, required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Datetime },
  validations: {
    user: {
      username: { required, minLength: minLength(3) },
      dateOfBirth: { required },
      gender: { required },
      division: { required },
      vehicle: {
        plateNumber: { required },
        type: { required }
      }
    }
  },
  data() {
    return {
      vehicle: {
        plateNumber: "",
        type: ""
      },
      userHaveVehicle: "no",
      genderType: ["MALE", "FEMALE"],
      divisionType: ["TECHNOLOGY", "FINANCE", "HUMAN RESOURCE"]
    };
  },
  computed: {
    ...mapGetters('user', ['user']),
    currentDateTime() {
      return new Date().toISOString();
    },
    userId(){
      return this.$route.params.id
    },
    isShowingVehicleField() {
      console.log(this.userHaveVehicle)
      return this.userHaveVehicle == "yes";
    },
    formatDate: {
      set(newValue) {
        this.user.dateOfBirth = newValue;
      },
      get() {
        return this.user.dateOfBirth ? new Date(this.user.dateOfBirth).toISOString() : "";
      }
    },
    ifuserHaveVehicle:{
      set(newValue) {
        this.userHaveVehicle = newValue;
      },
      get() {
        return !!this.user.vehicle ? "yes" : "no";
      } 
    }
  },
  methods: {
    ...mapActions("user", ["getUser","updateUser"]),
    moveTo(page) {
      this.$router.push({ name: page });
    },
    sendCreateUserForm() {
      this.user.dateOfBirth = new Date(this.user.dateOfBirth).getTime();
      this.updateUser(this.user);
      this.moveTo('user')
    },
    validateUserForm() {
      this.$v.user.$touch();
      // if (this.isShowingVehicleField) {
      //   this.$v.vehicle.$touch();
      //   this.user.vehicle = this.vehicle;
      //   if (!this.$v.user.$invalid && !this.$v.vehicle.$invalid) {
      //     this.sendCreateUserForm();
      //   }
      // } else {
        if (!this.$v.user.$invalid) {
          this.sendCreateUserForm();
        }
      // }
    },
    checkUserHaveVehicle(){
      console.log('HELO')
      if(!!this.user.vehicle) {
        this.user.vehicle = {
          plateNumber: "",
          type: ""
        }
      }

      console.log(this.user)
    }
  },
  created(){
    this.getUser(this.userId).then(()=>this.checkUserHaveVehicle())
  }
};
