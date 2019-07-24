import transactionApi from "@/api/transaction";
import offlineService from "@/api/transaction-offline";
import { mapActions, mapState } from "vuex";
import NotificationContainer from "@/components/NotificationContainer.vue";

const imageIdb = "offlineImages";
const formIdb = "offlineForms";
export default {
  data () {
    return {
      isSending: false,
      interval: null
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
      this.interval = setInterval(() => {
        navigator.onLine && !this.isSending ? this.prepareSendingData() : "";
      }, 10000);
    },
    setSendingData (value) {
      this.isSending = value
    },
    prepareSendingData () {
      this.setSendingData(true)
      this.sendDataToServer()
    },
    async sendDataToServer () {
      const forms = await offlineService.getAllDataFromIndexedDB(formIdb);
      const images = await offlineService.getAllDataFromIndexedDB(imageIdb);
      if (images.length > 0 && forms.length > 0) {
        this.sendImageAndFormToServer(images);
      } else if (images.length > 0 && !forms.length > 0) {
        this.sendOnlyImageToServer(images)
      } else if (!images.length > 0 && forms.length > 0) {
        this.sendOnlyFormToServer(forms);
      } else {
        this.setSendingData(false)

      }
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
    sendOnlyImageToServer (images) {
      this.createTransaction(images[0]).then(() => {
        offlineService.deleteDataByKeyFromIndexedDB(
          imageIdb,
          images[0].id
        ).then(() => {
          this.addSuccessImageNotification();
          this.setSendingData(false)
        })
      });
    },
    sendImageAndFormToServer (images) {
      images.map(image => {
        console.log('before send', image)
        transactionApi.createTransaction(image, this.token).then(response => {
          console.log('post Trans', response)
          offlineService.deleteDataByKeyFromIndexedDB(imageIdb, image.id)
          this.sendFormAfterImageToServer(image.id, response);
        });
      })
    },
    async findFormByImageID (id) {
      return await offlineService.findDataByKeyFromIndexedDB(
        formIdb,
        id
      );
    },
    async sendFormAfterImageToServer (formId, response) {
      const form = await this.findFormByImageID(formId)
      // form.id = response.data.id;
      form.image = response.data.data.image;
      console.log('before send', form)
      transactionApi
        .saveTransaction(form, this.token)
        .then((response) => {
          console.log('put trans', response)
          offlineService.deleteDataByKeyFromIndexedDB(formIdb, formId)
          this.addSuccessImageNotification();
          this.addSuccessFormNotification();
          this.setSendingData(false)
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
    ...mapState('auth', ['token'])
  },
  created () {
    this.checkConnectivityStatus();
  },
  beforeDestroy () {
    clearTimeout(this.interval);
  }
};
