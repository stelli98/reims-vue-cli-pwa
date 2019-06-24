import UserList from "@/components/UserList.vue";
import Pagination from "@/components/Pagination.vue";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    UserList,
    Pagination
  },
  data() {
    return {
      isActiveTab: true
    };
  },
  computed: {
    ...mapState("user", ["users", "pagination"]),
    options() {
      return {
        page: parseInt(this.$route.query.page) || 1,
        size: parseInt(this.$route.query.size) || 10,
        sort_by: "created_at",
        search: this.$route.query.search || ""
      };
    }
  },
  methods: {
    ...mapActions("user", ["getUsers"]),
    moveTo() {
      this.$router.go(-1);
    },
    changeTab() {
      this.isActiveTab = !this.isActiveTab;
    },
    routeTo() {
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
    }
  },
  watch: {
    options() {
      this.updateUser();
    }
  },
  mounted() {
    this.updateUser();
  }
};
