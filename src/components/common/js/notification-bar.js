import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeout: null
    };
  },
  mounted() {
    this.timeout = setTimeout(
      () => this.removeNotification(this.notification),
      5000
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`;
    }
  },
  methods: mapActions("notification", ["removeNotification"])
};
