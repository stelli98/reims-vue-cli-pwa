// import idbs from "@/api/indexedDBService";
// import transactionApi from "@/api/transaction";
// export default {
//   data() {
//     return {
//       isSending: false
//     };
//   },
//   computed: {
//     isOnline() {
//       return navigator.onLine == true;
//     }
//   },
//   methods: {
//     async storeToIndexedDB(storeName, image) {
//       try {
//         const data = {
//           id: Date.now(),
//           image: image
//         };
//         idbs.saveData(storeName, data);
//       } catch (e) {
//         alert(e);
//       }
//     },
//     async getAllDataFromIndexedDB(storeName) {
//       return await idbs.getAllData(storeName);
//     },
//     async deleteDataByKeyFromIndexedDB(storeName, key) {
//       await idbs.deleteDataByKey(storeName, key);
//     },
//     async deleteAllDataFromIndexedDB(storeName) {
//       await idbs.deleteAllData(storeName);
//     },
//     checkConnectivityStatus() {
//       setInterval(() => {
//         this.isOnline && !this.isSending ? this.sendDataToServer() : "";
//       }, 10000);
//     },
//     async sendDataToServer() {
//       this.isSending = true;
//       const a = await this.getAllDataFromIndexedDB("offlineImages");
//       //get form
//       Promise.all(
//         a.map(data => {
//           transactionApi.createTransaction(data).then(response => {
//             //get the id, map form , insert id from response
//             // success // delete
//             console.log(response);
//           });
//         })
//       );
//       // Promise.all(
//       //   transactionApi.createTransaction(images).then(response => {
//       //     console.log(response);
//       //   })
//       // );
//     }
//   },
//   created() {
//     this.checkConnectivityStatus();
//   },
//   watch: {
//     connected() {
//       console.log(this.isOffline);
//     }
//   }
// };
