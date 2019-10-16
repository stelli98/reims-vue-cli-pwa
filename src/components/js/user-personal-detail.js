import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
      ...mapGetters('user',['user']),
      userId() {
        return this.$route.params.id;
      }
    },
    methods: {
        ...mapActions('user',[ 'getUser'])
    },
    created () {  
      this.getUser(this.userId);
    }
}