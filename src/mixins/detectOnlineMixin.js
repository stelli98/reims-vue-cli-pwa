import idbs from "@/api/indexedDBService";
export const detectOnlineMixin = {
  computed: {
    isOnline() {
      return this.$root.$data.onLine;
    }
  },
  created() {
    idbs.dbPromise();
  }
};
