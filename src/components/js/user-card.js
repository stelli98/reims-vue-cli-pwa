import { mapActions } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
  mixins: [CommonMixins],
  props: {
    user: Object,
    index: 0
  },
  computed: {
    userName() {
      return this.$options.filters.trimTextFormatter(this.user.username, 10);
    }
  },
  methods: {
    ...mapActions("user", ["deleteUser"]),
    removeUser(id) {
      this.deleteUser(id).then(() => {
        this.moveTo('user')
      });
    }
  }
};
