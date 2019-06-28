import { openDb } from "idb";
const dbPromise = () => {
  if (!("indexedDB" in window)) {
    throw new Error("Browser does not support IndexedDB");
  }
  return window.indexedDB.open("ReimsDB", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("todos")) {
      upgradeDb.createObjectStore("todos");
    }
    if (!upgradeDb.objectStoreNames.contains("completed")) {
      upgradeDb.createObjectStore("completed");
    }
  });
};
const saveToStorage = async (storeName, tasks) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(tasks, storeName);
    return tx.complete;
  } catch (error) {
    return error;
  }
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

export default {
  checkStorage,
  saveToStorage
};
