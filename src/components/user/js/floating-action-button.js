import { mapActions, mapGetters } from "vuex";
import { ModalBus } from "@/components/common/js/event-bus.js";
const PopUpMessage = () => import("@/components/common/PopUpMessage.vue");

const WRONG_EXT =
  "We only accept .jpg, .jpeg, .png ext. Please reupload receipt";
const TOO_MANY_IMAGES =
  "You only can insert up to 5 images. Please reupload again.";
const NO_VEHICLE =
  "There is no vehicle registered under your name. Please ask admin to register your vehicle";
export default {
  components: {
    PopUpMessage
  },
  data() {
    return {
      displayMenu: false,
      windowFileReader: new FileReader()
    };
  },
  computed: {
    ...mapGetters("auth", ["hasVehicle"])
  },
  methods: {
    ...mapActions("transaction", ["setImages", "setImage"]),
    toggleDisplayMenu() {
      this.displayMenu = !this.displayMenu;
      this.$emit("isActionButtonActive", this.displayMenu);
    },
    onOCRFileChange(e, type) {
      if (this.hasVehicle || this.hasVehicle === 'true') {
        const image = e.target.files[0];
        this.uploadImage(image, type);
      } else {
        this.showErrorMessage(NO_VEHICLE);
      }
    },
    onNonOCRFileChange(e) {
      const fileResult = [];
      const files = e.target.files;
      if (this.checkTotalImagesLessThanFive(files.length)) {
        if (!this.checkImageConsistOfWrongExtension(files)) {
          Object.values(files).forEach(image => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function() {
              fileResult.push(reader.result);
            };
          });
          setTimeout(() => {
            this.setImages(fileResult);
            this.$router.push({ name: "create-medical" });
          }, 500);
        }
      }
    },
    uploadImage(image, category) {
      if (this.checkType(image.name)) {
        const file = URL.createObjectURL(image);
        this.setImage(file);
        this.$router.push({ name: "create-transaction-1", query: { category } });
      } else {
        this.showErrorMessage(WRONG_EXT);
      }
    },
    checkType(fileFullName) {
      const ext = fileFullName.split(".")[fileFullName.split(".").length - 1];
      return ext == "jpg" || ext == "png" || ext == "jpeg";
    },
    checkTotalImagesLessThanFive(total) {
      const validation = total <= 5;
      validation ? "" : this.showErrorMessage(TOO_MANY_IMAGES);
      return total <= 5;
    },
    showErrorMessage(content) {
      ModalBus.$emit("open", {
        component: PopUpMessage,
        title: "Error",
        type: "warning",
        content: content
      });
    },
    checkImageConsistOfWrongExtension(files) {
      const result = Object.values(files).map(file => {
        return this.checkType(file.name);
      });
      const arrayResult = result.includes(false);
      arrayResult ? this.showErrorMessage(WRONG_EXT) : "";
      return arrayResult;
    }
  }
};
