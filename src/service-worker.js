
const id = document.cookie.replace(
  /(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
)
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
)

if (workbox) {
  // adjust log level for displaying workbox logs
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can
  // precache  This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  // Make sure to return a specific response for all navigation requests.
  // Since we have a SPA here, this should be index.html always.
  // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
  workbox.routing.registerNavigationRoute("/index.html");


  workbox.routing.registerRoute(
    new RegExp('/api'),
    new workbox.strategies.NetworkOnly()
  );

  // const bgSyncPlugin = new workbox.backgroundSync.Plugin('testQueque', {
  //   maxRetentionTime: 24 * 60
  // });

  // workbox.routing.registerRoute(
  //   'https://reqres.in/api/users',
  //   new workbox.strategies.NetworkOnly({
  //     plugins: [bgSyncPlugin]
  //   }),
  //   'POST'
  // );

  // navigator.serviceWorker.ready.then(function (reg) {
  //   return reg.sync.register('myQueueName');
  // })

  // const queue = new workbox.backgroundSync.Queue('myQueueName');

  // self.addEventListener('fetch', (event) => {
  //   // Clone the request to ensure it's safe to read when
  //   // adding to the Queue.
  //   const promiseChain = fetch(event.request.clone())
  //     .catch((err) => {
  //       return queue.pushRequest({ request: event.request });
  //     });

  //   event.waitUntil(promiseChain);
  // });

  self.onsync = function (event) {
    if (event.tag == 'testSync') {
      console.log('SYNC SUCCESS')
      event.waitUntil(checkDataInIDB());
    }
  }

  function getAllData () {
    return new Promise(function (resolve, reject) {
      var db = indexedDB.open('ReimsDB');
      db.onsuccess = function (event) {
        this.result.transaction("offlineImages").objectStore("offlineImages").getAll().onsuccess = function (event) {
          resolve(event.target.result);
        }
        this.result.transaction("offlineForms").objectStore("offlineForms").getAll().onsuccess = function (event) {
          resolve(event.target.result);
        }
      }
      db.onerror = function (err) {
        reject(err);
      }
    });
  }

  // const getAllData = async storeName => {
  //   try {
  //     const db = await dbPromise();
  //     const tx = db.transaction(storeName, "readonly");
  //     const store = tx.objectStore(storeName);
  //     return store.getAll();
  //   } catch (error) {
  //     return error;
  //   }
  // };

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

  async function checkDataInIDB () {
    const images = await getAllData(imageIdb)
      .then(images =>
        images.filter(x => {
          return x.userId == id;
        })
      );
    const forms = await getAllData(formIdb)
      .then(forms => {
        return forms.filter(x => {
          return x.userId == id;
        });
      });
    if (images.length > 0 || forms.length > 0) {
      sendDataToServer(images, forms);
    }
  }
  function sendDataToServer (images, forms) {
    if (images.length > 0 && forms.length > 0) {
      sendImageAndFormToServer(images, 0);
    } else if (images.length > 0 && !forms.length > 0) {
      sendOnlyImageToServer(images[0]);
    } else if (!images.length > 0 && forms.length > 0) {
      sendOnlyFormToServer(forms[0]);
    }
  }
  function sendOnlyFormToServer (form) {
    saveTransaction(form, token).then(() => {
      deleteDataByKey(formIdb, form.id)
        .then(() => {
          getTransactions();
          addSuccessFormNotification();
          setSendingData(false);
        });
    });
  }
  function sendOnlyImageToServer (image) {
    createTransaction(sendImageObject(image), token).then(() => {
      deleteDataByKey(imageIdb, image.id)
        .then(() => {
          addSuccessImageNotification();
          setSendingData(false);
        });
    });
  }
  function sendImageAndFormToServer (images, index) {
    if (index + 1 > images.length) return;
    createTransaction(sendImageObject(images[index]), token)
      .then(response => {
        deleteDataByKey(
          imageIdb,
          images[index].id
        );
        sendFormAfterImageToServer(images[index].id, response, {
          success: () => {
            getTransactions();
            sendImageAndFormToServer(images, index + 1);
          }
        });
      });
  }
  function sendImageObject (data) {
    return {
      image: data.image
    };
  }
  async function findFormByImageID (id) {
    return await findDatabyKey(formIdb, id);
  }
  async function sendFormAfterImageToServer (formId, response, { success }) {
    const form = await findFormByImageID(formId);
    form.image = response.data.data.image;
    saveTransaction(form, token).then(response => {
      deleteDataByKey(formIdb, formId);
      addSuccessImageNotification();
      addSuccessFormNotification();
      setSendingData(false);
      success();
      return response;
    });
  }
  function createTransaction (data, token) {
    return fetch('http://localhost:9095/api/transactions', {
      method: 'POST',
      data,
      headers: {
        Authorization: token
      }
    })
  }

  function saveTransaction (data, token) {
    return fetch('http://localhost:9095/api/transactions', {
      method: 'PUT',
      data,
      headers: {
        Authorization: token
      }
    })
  }
}
