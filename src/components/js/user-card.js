import { mapActions } from "vuex";

export default {
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
        this.$emit('deleteAnUser');
      });
    },
    moveToUserDetail(id){
      this.$router.push({name: 'user-detail', params:{id}, query:{activeTab:"UserPersonalDetail"}})
    }
  }
};
