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
        console.log('click')
          this.isComponentActive = !this.isComponentActive
      }
  },
};
