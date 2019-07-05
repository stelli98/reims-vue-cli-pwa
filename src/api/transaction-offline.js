import idbs from "@/api/indexedDBService";

const response = {
  data: {
    data: {
      category: "FUEL",
      date: "",
      type: "",
      volume: 0,
      unitPrice: 0,
      title: ""
    }
  }
};

const imageIdb = "offlineImages";
const formIdb = "offlineForms";

export default {
  storeImageOffline(image) {
    const data = {
      id: Date.now(),
      image: image
    };
    this.storeToIndexedDB(imageIdb, data);
    return response;
  },
  async storeFormOffline(form) {
    const id = this.isTransactionCreated(form)
      ? form.id
      : await this.getLastIndexIDFromIndexedDB(imageIdb);
    const data = {
      id: id,
      ...form
      //add user data
    };
    this.storeToIndexedDB(formIdb, data);
  },
  isTransactionCreated(form) {
    return !!form.id;
  },
  async storeToIndexedDB(storeName, data) {
    try {
      await idbs.saveData(storeName, data);
    } catch (e) {
      alert(e);
    }
  },
  async getLastIndexIDFromIndexedDB(storeName) {
    return await idbs.getLastIndexData(storeName);
  },
  async getAllDataFromIndexedDB(storeName) {
    return await idbs.getAllData(storeName);
  },
  async deleteDataByKeyFromIndexedDB(storeName, key) {
    await idbs.deleteDataByKey(storeName, key);
  },
  async deleteLastDataFromIndexedDB(storeName) {
    await this.deleteDataByKeyFromIndexedDB(
      storeName,
      this.getLastIndexIDFromIndexedDB(storeName)
    );
  },
  async deleteAllDataFromIndexedDB(storeName) {
    await idbs.deleteAllData(storeName);
  },
  async findDataByKeyFromIndexedDB(storeName, key) {
    return await idbs.findDatabyKey(storeName, key);
  }
};
