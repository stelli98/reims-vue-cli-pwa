import NotificationBar from "@/components/NotificationBar";
import { mapGetters } from "vuex";

export default {
  components: { NotificationBar },
  computed: mapGetters("notification", ["notifications"])
};
