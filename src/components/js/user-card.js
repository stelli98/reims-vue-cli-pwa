import { mapActions } from "vuex";
export default {
  props: {
    user: Object
  },
  computed: {
    userName() {
      return this.$options.filters.trimTextFormatter(this.user.username, 10);
    }
  },
  methods: {
    ...mapActions("user", ["deleteUser"]),
    removeUser(id) {
      this.deleteUser(id);
    }
  }
};
