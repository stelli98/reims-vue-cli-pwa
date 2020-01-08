const NotificationBar = () => import("@/components/common/NotificationBar");
import { mapGetters } from "vuex";

export default {
  components: { NotificationBar },
  computed: mapGetters("notification", ["notifications"])
};
