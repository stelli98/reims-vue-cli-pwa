const UserList = () => import("@/components/UserList.vue");
const Pagination = () => import("@/components/Pagination.vue");

import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    UserList,
    Pagination
  },
  computed: {
    ...mapGetters("user", ["users", "pagination"]),
    options() {
      return {
        page: this.$route.query.page || "1",
        size: this.$route.query.size || "10",
        sort_by: "created_at",
        search: this.$route.query.search || ""
      };
    }
  },
  methods: {
    ...mapActions("user", ["getUsers"]),
    ...mapActions("auth", ["logout"]),
    moveTo() {
      this.$router.push({ name: "user-create" });
    },
    updateUser() {
      this.getUsers(this.options);
    },
    changePage(toPage) {
      this.options.page = parseInt(toPage);
      this.$router.push({ name: "user", query: this.options });
      this.getUsers(this.options);
    },
    submitSearch(event) {
      this.options.search = event.target.value;
      this.$router.push({ name: "user", query: this.options });
      this.getUsers(this.options);
    },
    doLogout() {
      this.logout().then(() => {
        this.$router.push({ name: "login" });
      });
    }
  },
  watch: {
    options() {
      this.updateUser();
    }
  },
  mounted () {
    this.$router.push({ query: { ...this.options, ...this.$route.query } })
    this.updateUser();
  }
};
