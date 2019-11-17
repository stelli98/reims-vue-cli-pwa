import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
    mixins: [CommonMixins],
    computed: {
      ...mapGetters('user',['user'])
    },
    methods: {
        ...mapActions('user',[ 'getUser'])
    },
    created () {  
      this.getUser(this.id);
    }
}