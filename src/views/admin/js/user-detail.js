import UserPersonalDetail from "@/components/admin/UserPersonalDetail";
import UserFamilyDetail from "@/components/admin/UserFamilyDetail";
const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  components: {
    UserPersonalDetail,
    UserFamilyDetail,
    GlobalHeader
  },
  data() {
    return {
      isComponentActive: true,
      tabs: {
        true: {
          name: "UserPersonalDetail"
        },
        false: {
          name: "UserFamilyDetail"
        }
      }
    };
  },
  computed: {
    currentComponent() {
      return this.tabs[this.isComponentActive].name;
    }
  },
  methods: {
    switchTab(boolean) {
      this.isComponentActive = boolean;
      this.$router.push({
        query: {
          activeTab: this.currentComponent
        }
      });
    },
    moveTo(page) {
      this.$router.push({ name: page });
    }
  },
  created() {
    this.isComponentActive = this.$route.query.activeTab === "UserPersonalDetail";
  }
};
