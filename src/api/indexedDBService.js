import { openDb } from "idb";

const dbPromise = () => {
  if (!("indexedDB" in window)) {
    throw new Error("Browser does not support IndexedDB");
  }

  return openDb("ReimsDB", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("offlineImages")) {
      upgradeDb.createObjectStore("offlineImages");
    }

    if (!upgradeDb.objectStoreNames.contains("offlineForms")) {
      upgradeDb.createObjectStore("offlineForms");
    }
  });
};

const checkStorage = async storeName => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);

    return store.get(storeName);
  } catch (error) {
    return error;
  }
};

const saveToStorage = async (storeName, data) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(data, storeName);
    return tx.complete;
  } catch (error) {
    return error;
  }
};

export default {
  dbPromise,
  checkStorage,
  saveToStorage
};
