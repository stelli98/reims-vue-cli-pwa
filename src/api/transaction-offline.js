import idbs from "@/api/indexedDBService";
import store from "@/store";
const imageIdb = "offlineImages";
const formIdb = "offlineForms";

export default {
  storeImageOffline(data) {
    if (data.attachments) {
      const request = {
        id: Date.now(),
        userId: store.state.auth.id,
        attachments: data.attachments, 
        category: data.category
      };
      console.log('request image', request)
      this.storeToIndexedDB(imageIdb, request);
      this.throwError();
    }
  },
  async storeFormOffline(form) {
    if (!form.id) {
      const id = await this.getLastIndexIDFromIndexedDB(imageIdb);
      console.log('id form', id)
      const data = {
        id: id,
        ...form,
        userId: store.state.auth.id
      };
      console.log('request form', data)
      this.storeToIndexedDB(formIdb, data);
      this.throwError();
    }
  },
  throwError() {
    return Promise.reject(new Error("Offline. Fail to send data to server"));
  },
  async storeToIndexedDB(storeName, data) {
    try {
      console.log('before idb store name', storeName);
      console.log('before idb store data', data);
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
    return await idbs.deleteDataByKey(storeName, key);
  },
  async deleteLastDataFromIndexedDB(storeName) {
    return await this.deleteDataByKeyFromIndexedDB(
      storeName,
      await this.getLastIndexIDFromIndexedDB(storeName)
    );
  },
  async findDataByKeyFromIndexedDB(storeName, key) {
    return await idbs.findDatabyKey(storeName, key);
  }
};
