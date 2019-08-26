const NotificationBar = () => import("@/components/NotificationBar");
import { mapGetters } from "vuex";

export default {
  components: { NotificationBar },
  computed: mapGetters("notification", ["notifications"])
};
