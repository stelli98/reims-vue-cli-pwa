import idbs from "@/api/indexedDBService";
import store from "@/store";
const imageIdb = "offlineImages";
const formIdb = "offlineForms";

export default {
  storeImageOffline(data) {
    if (data.attachments) {
      const request = {
        id: this.setId(data),
        userId: store.state.auth.id,
        attachments: data.attachments,
        category: data.category
      };
      this.storeToIndexedDB(imageIdb, request);
      this.throwError();
    }
  },
  setId(data) {
    return data.id ? data.id : Date.now();
  },
  async storeFormOffline(form) {
    if (!form.id) {
      const id = await this.getLastIndexIDFromIndexedDB(imageIdb);
      const data = {
        id: id,
        ...form,
        userId: store.state.auth.id
      };
      this.storeToIndexedDB(formIdb, data);
      this.throwError();
    }
  },
  throwError() {
    return Promise.reject(new Error("Offline. Fail to send data to server"));
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
  async getBsyncMedicalData() {
    return await idbs.getBsyncMedicalData(
      "workbox-background-sync",
      "requests"
    );
  },
  async getMedicalData() {
    const finalResults = [];
    const requests = await this.getBsyncMedicalData();
    if (requests.length > 0) {
      requests.map(request => {
        var blob = new Blob([request.storableRequest.requestInit.body], {
          type: "application/json"
        });
        const fr = new FileReader();
        fr.onload = function() {
          finalResults.push(JSON.parse(this.result));
        };
        fr.readAsText(blob);
      });
    }
    return finalResults;
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
  },
  async deleteAllIDBDatabase() {
    await indexedDB.databases().then(dbs => {
      dbs.map(db => idbs.deleteIDBDatabase(db.name));
    });
  }
};
