import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";
import { mapActions, mapGetters } from "vuex";
import NotificationContainer from "@/components/NotificationContainer.vue";

const imageIdb = "offlineImages";
const formIdb = "offlineForms";
export default {
  name: "syncTransactions",
  data () {
    return {
      isSending: false,
      interval: null,
    };
  },
  components: {
    NotificationContainer
  },
  methods: {
    ...mapActions("transaction", ["createTransaction", "getTransactions"]),
    ...mapActions("notification", ["addNotification"]),
    checkConnectivityStatus () {
      this.interval = setInterval(() => {
        navigator.onLine && !this.isSending ? this.checkDataInIDB() : "";
      }, 10000);
    },
    setSendingData (value) {
      this.isSending = value;
    },
    async checkDataInIDB () {
      const images = await offlineService
        .getAllDataFromIndexedDB(imageIdb)
        .then(images =>
          images.filter(x => {
            return x.userId == this.id;
          })
        );
      const forms = await offlineService
        .getAllDataFromIndexedDB(formIdb)
        .then(forms => {
          return forms.filter(x => {
            return x.userId == this.id;
          });
        });
      if (images.length > 0 || forms.length > 0) {
        this.setSendingData(true);
        this.sendDataToServer(images, forms);
      } else {
        this.setSendingData(false);
      }
    },
    sendDataToServer (images, forms) {
      if (images.length > 0 && forms.length > 0) {
        this.sendImageAndFormToServer(images, 0);
      } else if (images.length > 0 && !forms.length > 0) {
        this.sendOnlyImageToServer(images[0]);
      } else if (!images.length > 0 && forms.length > 0) {
        this.sendOnlyFormToServer(forms[0]);
      }
    },
    checkImagesByUserId (images) {
      return images.find(image => image.userId == this.id);
    },
    checkFormsByUserId (forms) {
      return forms.find(form => form.userId == this.id);
    },
    sendOnlyFormToServer (form) {
      transactionApi.saveTransaction(form, this.token).then(() => {
        offlineService
          .deleteDataByKeyFromIndexedDB(formIdb, form.id)
          .then(() => {
            this.getTransactions();
            this.addSuccessFormNotification();
            this.setSendingData(false);
          });
      });
    },
    sendOnlyImageToServer (image) {
      this.createTransaction(this.sendImageObject(image), this.token).then(() => {
        offlineService
          .deleteDataByKeyFromIndexedDB(imageIdb, image.id)
          .then(() => {
            this.addSuccessImageNotification();
            this.setSendingData(false);
          });
      });
    },
    sendImageAndFormToServer (images, index) {
      if (index + 1 > images.length) return;
      transactionApi
        .createTransaction(this.sendImageObject(images[index]), this.token)
        .then(response => {
          offlineService.deleteDataByKeyFromIndexedDB(
            imageIdb,
            images[index].id
          );
          this.sendFormAfterImageToServer(images[index].id, response, {
            success: () => {
              this.sendImageAndFormToServer(images, index + 1);
            }
          });
        });
    },
    sendImageObject (data) {
      return {
        image: data.image
      };
    },
    async findFormByImageID (id) {
      return await offlineService.findDataByKeyFromIndexedDB(formIdb, id);
    },
    async sendFormAfterImageToServer (formId, response, { success }) {
      const form = await this.findFormByImageID(formId);
      form.image = response.data.data.image;
      transactionApi.saveTransaction(form, this.token).then(response => {
        this.getTransactions();
        offlineService.deleteDataByKeyFromIndexedDB(formIdb, formId);
        this.addSuccessImageNotification();
        this.addSuccessFormNotification();
        this.setSendingData(false);
        success();
        return response;
      });
    },
    addSuccessFormNotification () {
      const notification = {
        type: "success",
        message: "You're back online. Your form has been submitted."
      };
      this.addNotification(notification);
    },
    addSuccessImageNotification () {
      const notification = {
        type: "success",
        message: "You're back online. Your image has been submitted."
      };
      this.addNotification(notification);
    }
  },
  computed: {
    ...mapGetters("auth", ["token", "id"])
  },
  created () {
    this.checkConnectivityStatus();
  },
  beforeDestroy () {
    clearTimeout(this.interval);
  }
};
