import UserPersonalDetail from "@/components/UserPersonalDetail" ;
import UserFamilyDetail from "@/components/UserFamilyDetail" ;

export default {
  components: {
    UserPersonalDetail,
    UserFamilyDetail
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
    this.isComponentActive = this.$route.query.activeTab === "UserPersonalDetail" ? true : false;
  },
};
