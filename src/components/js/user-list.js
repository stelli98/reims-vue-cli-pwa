const UserCard = () => import("@/components/UserCard.vue")
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
