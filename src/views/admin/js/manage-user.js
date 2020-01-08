const UserList = () => import("@/components/admin/UserList.vue");
const Pagination = () => import("@/components/common/Pagination.vue");

import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
  mixins: [CommonMixins],
  components: {
    UserList,
    Pagination
  },
  computed: {
    ...mapGetters("admin", ["users", "pagination"]),
    options() {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 10,
        sort_by: "createdAt",
        search: this.$route.query.search || ""
      };
    }
  },
  methods: {
    ...mapActions("admin", ["getUsers"]),
    ...mapActions("auth", ["logout"]),
    updateUser() {
      this.getUsers(this.options).then(() => {
        if (this.users.length === 0 && this.$route.query.page != 1) {
          this.changePage(1);
        }
      });
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
        this.moveTo("login");
      });
    }
  },
  created() {
    this.$router.push({ query: { ...this.options, ...this.$route.query } });
    this.updateUser();
  }
};
