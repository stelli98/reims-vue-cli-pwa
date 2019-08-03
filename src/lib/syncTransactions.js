import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";
import { mapActions, mapGetters } from "vuex";
import NotificationContainer from "@/components/NotificationContainer.vue";

const imageIdb = "offlineImages";
const formIdb = "offlineForms";
export default {
  data () {
    return {
      isSending: false,
      interval: null,
      images: [],
      forms: []
    };
  },
  components: {
    NotificationContainer
  },
  methods: {
    ...mapActions("transaction", ["createTransaction", "getTransactions"]),
    ...mapActions("notification", [
      "addNotification",
    ]),
    checkConnectivityStatus () {
      this.interval = setInterval(() => {
        navigator.onLine && !this.isSending ? this.checkDataInIDB() : "";
      }, 10000);
    },
    setSendingData (value) {
      this.isSending = value
    },
    async checkDataInIDB () {
      const images = await offlineService.getAllDataFromIndexedDB(imageIdb).then(images =>
        images.filter(x => {
          return x.userId == this.id
        })
      )
      const forms = await offlineService.getAllDataFromIndexedDB(formIdb).then(forms => {
        return forms.filter(x => {
          return x.userId == this.id
        })
      })
      if (images.length > 0 || forms.length > 0) {
        this.setSendingData(true)
        this.sendDataToServer(images, forms)
      } else {
        this.setSendingData(false)
      }
    },
    sendDataToServer (images, forms) {
      if (images.length > 0 && forms.length > 0) {
        this.sendImageAndFormToServer(images, 0)
      } else if (images.length > 0 && !forms.length > 0) {
        this.sendOnlyImageToServer(images)
      } else if (!images.length > 0 && forms.length > 0) {
        this.sendOnlyFormToServer(forms);
      }
    },
    checkImagesByUserId (images) {
      return images.find(image => image.userId == this.id)
    },
    checkFormsByUserId (forms) {
      return forms.find(form => form.userId == this.id)
    },
    sendOnlyFormToServer (forms) {
      forms.map(data => {
        transactionApi.saveTransaction(data, this.token).then(() => {
          offlineService.deleteDataByKeyFromIndexedDB(formIdb, data.id).then(() => {
            this.addSuccessFormNotification();
            this.setSendingData(false)
          })
        });
      });
    },
    sendOnlyImageToServer (image) {
      this.createTransaction(this.sendImageObject(image)).then(() => {
        offlineService.deleteDataByKeyFromIndexedDB(
          imageIdb,
          image.id
        ).then(() => {
          this.addSuccessImageNotification();
          this.setSendingData(false)
        })
      });
    },
    sendImageAndFormToServer (images, index) {
      console.log('index', index)
      if (index + 1 > images.length) return
      console.log('before send', images[index])
      transactionApi.createTransaction(this.sendImageObject(images[index]), this.token).then(response => {
        console.log('post response', response)
        offlineService.deleteDataByKeyFromIndexedDB(imageIdb, images[index].id)
        this.sendFormAfterImageToServer(images[index].id, response, {
          success: () => {
            this.sendImageAndFormToServer(images, index + 1)
          }
        })
      })
    },
    sendImageObject (data) {
      return {
        image: data.image
      }
    },
    async findFormByImageID (id) {
      return await offlineService.findDataByKeyFromIndexedDB(
        formIdb,
        id
      );
    },
    async sendFormAfterImageToServer (formId, response, { success }) {
      const form = await this.findFormByImageID(formId)
      form.image = response.data.data.image;
      console.log('before send', form)
      transactionApi
        .saveTransaction(form, this.token)
        .then((response) => {
          console.log('put trans', response)
          this.getTransactions()
          offlineService.deleteDataByKeyFromIndexedDB(formIdb, formId)
          this.addSuccessImageNotification();
          this.addSuccessFormNotification();
          this.setSendingData(false)
          success()
          return response
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
  computed: {
    ...mapGetters('auth', ['token', 'id'])
  },
  created () {
    this.checkConnectivityStatus();
  },
  beforeDestroy () {
    clearTimeout(this.interval);
  }
};
