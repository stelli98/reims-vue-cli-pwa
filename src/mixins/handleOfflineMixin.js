import idbs from "@/api/indexedDBService";
export default {
  computed: {
    isOnline() {
      // eslint-disable-next-line
      console.log(navigator.onLine)
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
    }
  },
  watch: {
    isOnline() {
      // eslint-disable-next-line
      console.log("TEST");
    }
  }
};
