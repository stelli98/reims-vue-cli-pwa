import UserCard from "@/components/UserCard.vue";
export default {
  components: {
    UserCard
  },
  props: {
    users: Array
  },
  methods: {
    updateUsers() {
      this.$emit("updateUsers");
    }
  }
};
