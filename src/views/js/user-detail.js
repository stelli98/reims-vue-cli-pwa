import UserPersonalDetail from "@/components/UserPersonalDetail" ;
import UserFamilyDetail from "@/components/UserFamilyDetail" ;
const GlobalHeader = () => import("@/components/GlobalHeader");

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
        return this.tabs[this.isComponentActive].name
    }
  },
  methods: {
    switchTab() {
      this.isComponentActive = !this.isComponentActive;
      this.$router.push({ query: {
        activeTab : this.currentComponent
      }});
  }
  },
  created () {
    this.isComponentActive = !(this.$route.query.activeTab === "UserPersonalDetail" );
  },
};
