import idbs from "@/api/indexedDBService";
export default {
  computed: {
    isOnline() {
      return navigator.onLine;
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
        alert(e);
      }
    },
    async getAllDataFromIndexedDB(storeName) {
      return await idbs.getAllData(storeName);
    },
    async getLastIndexIDFromIndexedDB(storeName) {
      return await idbs.getLastIndexData(storeName);
    },
    async deleteDataByKeyFromIndexedDB(storeName, key) {
      await idbs.deleteDataByKey(storeName, key);
    },
    async deleteAllDataFromIndexedDB(storeName) {
      await idbs.deleteAllData(storeName);
    },
    checkConnectivityStatus() {
      setInterval(() => {
        //checkIDB
      }, 10000);
    }
  },
  created() {
    // this.checkConnectivityStatus();
  }
};
