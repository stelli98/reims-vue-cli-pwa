const UserCard = () => import("@/components/admin/UserCard.vue")
export default {
  components: {
    UserCard
  },
  props: {
    users: Array
  },
  methods: {
    deleteUser() {
      this.$emit('deleteUser');
    }
  },
};
