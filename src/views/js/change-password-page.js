import { minLength, required } from "vuelidate/lib/validators";
import {mapActions} from "vuex";

export default {
  validations: {
    user: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required }
    }
  },
  data() {
      return {
          user: {
              password: '',
              confirmPassword:''
          }
      }
  },
  computed: {
    userId() {
      return this.$route.params.id; 
    }
  },
  methods: {
    ...mapActions('user', ['changePassword']),
    submitChangePasswordForm() {
      this.$v.user.$touch();
      if (!this.$v.user.$invalid) {
        this.changePassword(this.userId, this.user)
      }
    },
    moveTo(page){
      this.$router.push({name: page, params: {id : this.userId}})
    }
  },
}
