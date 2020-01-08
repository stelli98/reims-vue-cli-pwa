import { mapGetters, mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
    mixins: [CommonMixins],
    computed: {
      ...mapGetters("admin",["user"])
    },
    methods: {
        ...mapActions("admin",[ "getUser"]),
        emptyStringFieldTemplate(value){
          return value || "-"
        }
    },
    created () {  
      this.getUser(this.id);
    }
}