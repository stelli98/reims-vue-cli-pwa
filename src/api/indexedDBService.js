import { openDb } from "idb";

const dbPromise = () => {
  if (!("indexedDB" in window)) {
    throw new Error("Browser does not support IndexedDB");
  }

  return openDb("ReimsDB", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("offlineImages")) {
      upgradeDb.createObjectStore("offlineImages", { keyPath: "id" });
    }

    if (!upgradeDb.objectStoreNames.contains("offlineForms")) {
      upgradeDb.createObjectStore("offlineForms", { keyPath: "id" });
    }
  });
};

const getAllData = async storeName => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAll();
  } catch (error) {
    return error;
  }
};

const saveData = async (storeName, data) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(data);
    return tx.complete;
  } catch (error) {
    return error;
  }
};

export default {
  dbPromise,
  getAllData,
  saveData
};
