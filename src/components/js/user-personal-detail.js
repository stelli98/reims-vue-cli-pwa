import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
    mixins: [CommonMixins],
    computed: {
      ...mapGetters('user',['user'])
    },
    methods: {
        ...mapActions('user',[ 'getUser']),
        emptyStringFieldTemplate(value){
          return value || "-"
        }
    },
    created () {  
      this.getUser(this.id);
    }
}