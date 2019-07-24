
import NotificationBar from "@/components/NotificationBar";
import { mapState } from "vuex";

export default {
    components: { NotificationBar },
    computed: mapState("notification", ["notifications"])
};
