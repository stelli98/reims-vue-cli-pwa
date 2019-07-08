<template>
  <div class="notification-bar" :class="notificationTypeClass">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      timeout: null
    };
  },
  mounted() {
    // this.timeout = setTimeout(
    //   () => this.removeNotification(this.notification),
    //   5000
    // );
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
</script>

<style lang="scss">
.notification-bar {
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  color: white;
}

.-text-error {
  background-color: #d91414;
}

.-text-success {
  background-color: #008954;
}
</style>
