const GlobalHeader = () => import("@/components/common/GlobalHeader");

export default {
  components: { GlobalHeader },
  computed: {
    activeSecondProgressBar() {
      return this.$route.name === "create-transaction-2"
        ? "progress-bar-active"
        : "";
    },
    activeThirdProgressBar() {
      return this.$route.name === "create-transaction-3"
        ? "progress-bar-active"
        : "";
    }
  }
};
