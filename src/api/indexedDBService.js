import { openDb } from "idb";

const dbPromise = () => {
  if (!("indexedDB" in window)) {
    throw new Error("Browser does not support IndexedDB");
  }

  return openDb("ReimsDB", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("offlineImages")) {
      upgradeDb.createObjectStore("offlineImages", {
        keyPath: "id",
        autoIncrement: true
      });
    }

    if (!upgradeDb.objectStoreNames.contains("offlineForms")) {
      upgradeDb.createObjectStore("offlineForms", {
        keyPath: "id",
        autoIncrement: true
      });
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
    console.log('data idb', data)
    store.put(data);
    return tx.complete;
  } catch (error) {
    return error;
  }
};

const getLastIndexData = async storeName => {
  const keys = await getAllKeys(storeName);
  const index = await getTotalData(storeName);
  return keys[index - 1];
};

const getAllKeys = async storeName => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAllKeys();
  } catch (error) {
    return error;
  }
};

const findDatabyKey = async (storeName, key) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.get(key);
  } catch (error) {
    console.log("File Not Found");
  }
};

const getTotalData = async storeName => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.count();
  } catch (error) {
    return error;
  }
};

const deleteAllData = async storeName => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.clear(storeName);
    return tx.complete;
  } catch (error) {
    return error;
  }
};

const deleteDataByKey = async (storeName, key) => {
  try {
    const db = await dbPromise();
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    await store.delete(key);
    return tx.complete;
  } catch (error) {
    return error;
  }
};

export default {
  findDatabyKey,
  getAllData,
  saveData,
  getLastIndexData,
  deleteAllData,
  deleteDataByKey
};
