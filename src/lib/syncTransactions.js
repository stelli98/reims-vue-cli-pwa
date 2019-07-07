import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";
import { mapActions } from "vuex";

const imageIdb = "offlineImages";
const formIdb = "offlineForms";
const transactionSync = {
  data() {
    return {
      isSending: false
    };
  },
  methods: {
    ...mapActions("transaction", ["createTransaction"]),
    checkConnectivityStatus() {
      setInterval(() => {
        navigator.onLine && !this.isSending ? this.sendDataToServer() : "";
      }, 10000);
    },
    async sendDataToServer() {
      this.isSending = true;
      const images = await offlineService.getAllDataFromIndexedDB(imageIdb);
      if (images.length > 0) {
        this.checkImageHasForm(images);
      } else {
        const forms = await offlineService.getAllDataFromIndexedDB(formIdb);
        if (forms.length > 0) {
          this.sendOnlyFormToServer(forms);
        } else {
          this.isSending = false;
        }
      }
    },
    async sendOnlyFormToServer(forms) {
      forms.map(data => {
        transactionApi.saveTransaction(data).then(() => {
          offlineService.deleteDataByKeyFromIndexedDB("offlineForms", data.id);
          this.isSending = false;
        });
      });
    },
    async checkImageHasForm(images) {
      const forms = await offlineService.getAllDataFromIndexedDB(formIdb);
      if (forms.length > 0) {
        forms.map(form => {
          this.sendImageAndFormToServer(form.id);
        });
      } else {
        this.createTransaction(images[0]).then(() => {
          offlineService.deleteDataByKeyFromIndexedDB(
            "offlineImages",
            images[0].id
          );
        });
      }
    },
    sendImageAndFormToServer(formId) {
      transactionApi.createTransaction(formId).then(response => {
        this.sendFormAfterImageToServer(formId, response);
      });
    },
    async sendFormAfterImageToServer(formId, response) {
      const form = await offlineService.findDataByKeyFromIndexedDB(
        formIdb,
        formId
      );

      form.id = response.data.id;
      transactionApi
        .saveTransaction(form)
        .then(() => this.deleteSuccessData(formId));
    },
    deleteSuccessData(id) {
      offlineService.deleteDataByKeyFromIndexedDB("offlineImages", id);
      offlineService.deleteDataByKeyFromIndexedDB("offlineForms", id);
      this.isSending = false;
    }
  },
  created() {
    this.checkConnectivityStatus();
  }
};

export default transactionSync;
