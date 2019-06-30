import idbs from "@/api/indexedDBService";
export const handleOfflineMixin = {
  computed: {
    isOnline() {
      return this.$root.$data.onLine;
    }
  },
  methods: {
    async storeToIndexedDB(storeName, image) {
      try {
        const data = {
          id: Date.now(),
          image: image
        };
        idbs.saveData(storeName, data);
      } catch (e) {
        console.log(e);
      }
    },
    async getAllDataFromIndexedDB(storeName) {
      const data = await idbs.getAllData(storeName);
      console.log(data);
    }
  },
  created() {}
};
