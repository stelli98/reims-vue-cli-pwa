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
      const data = await idbs.getAllData(storeName);
      alert(data);
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
