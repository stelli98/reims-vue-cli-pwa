import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
      ...mapGetters('user',['user']),
      userId() {
        return this.$route.params.id;
      }
    },
    methods: {
        ...mapActions('user',[ 'getUser']),
        moveTo(page){
          this.$router.push({ name : page , params: {id : this.userId}});
        }
    },
    created () {  
      this.getUser(this.userId);
    }
}