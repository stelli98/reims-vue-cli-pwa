import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";
import { mapActions } from "vuex";
import NotificationContainer from "@/components/NotificationContainer.vue";

const imageIdb = "offlineImages";
const formIdb = "offlineForms";
export default {
  data () {
    return {
      isSending: false
    };
  },
  components: {
    NotificationContainer
  },
  methods: {
    ...mapActions("transaction", ["createTransaction"]),
    ...mapActions("notification", [
      "addNotification",
    ]),
    checkConnectivityStatus () {
      setInterval(() => {
        navigator.onLine && !this.isSending ? this.sendDataToServer() : "";
      }, 10000);
    },
    async sendDataToServer () {
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
    async sendOnlyFormToServer (forms) {
      forms.map(data => {
        transactionApi.saveTransaction(data).then(() => {
          offlineService.deleteDataByKeyFromIndexedDB("offlineForms", data.id);
          this.addSuccessFormNotification();
          this.isSending = false;
        });
      });
    },
    async checkImageHasForm (images) {
      const forms = await offlineService.getAllDataFromIndexedDB(formIdb);
      if (forms.length > 0) {
        forms.map(form => {
          this.sendImageAndFormToServer(form.id);
        });
      } else {
        this.createTransaction(images[0]).then(() => {
          offlineService.deleteDataByKeyFromIndexedDB(
            imageIdb,
            images[0].id
          );
          this.addSuccessImageNotification();
        });
      }
    },
    sendImageAndFormToServer (imageId) {
      const image = offlineService.findDataByKeyFromIndexedDB(imageIdb, imageId)
      transactionApi.createTransaction(image).then(response => {
        offlineService.deleteDataByKeyFromIndexedDB(imageIdb, imageId);
        this.sendFormAfterImageToServer(imageId, response);
      });
    },
    async sendFormAfterImageToServer (formId, response) {
      const form = await offlineService.findDataByKeyFromIndexedDB(
        formIdb,
        formId
      );

      form.id = response.data.id;
      transactionApi
        .saveTransaction(form)
        .then(() => {
          offlineService.deleteDataByKeyFromIndexedDB("offlineForms", formId);
          this.isSending = false;
          this.addSuccessImageNotification();
          this.addSuccessFormNotification()
        });
    },
    addSuccessFormNotification () {
      const notification = {
        type: "success",
        message: "You're back online. Your form has been submitted."
      };
      this.addNotification(notification)
    },
    addSuccessImageNotification () {
      const notification = {
        type: "success",
        message: "You're back online. Your image has been submitted."
      };
      this.addNotification(notification)
    }
  },
  created () {
    this.checkConnectivityStatus();
  }
};
