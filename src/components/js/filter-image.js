import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  computed: {
    ...mapGetters("transaction",["image"]), 
    filters() {
      return this.makeFilter();
    }
  },
  created() {
    if (!this.image) {
      this.$router.push({ name: "create-transaction-1" });
    }
    this.setFilterToDefault();
  },
  methods: {
    ...mapActions("transaction", [
      "createTransaction",
      "setOCRResultType",
      "setImage"
    ]),
    ...mapActions("notification", ["addNotification"]),
    makeFilter() {
      const filterSet = this.filterFunctions;

      let filterString = "";
      const defaultValues = this.defaultValues();
      for (const filterFunc in filterSet) {
        if (filterSet[filterFunc] !== defaultValues[filterFunc]) {
          filterString =
            filterString + filterFunc + "(" + filterSet[filterFunc] + ") ";
        }
      }
      return { filter: filterString };
    },
    defaultValues() {
      return {
        grayscale: 1,
        brightness: 1.1,
        contrast: 1
      };
    },
    setFilterToDefault(){
      this.filterFunctions = this.defaultValues();
    },
    filterImage(){
      this.setImage(this.generateImage())
    },
    generateImage() {
      const canvas = document.createElement("canvas");
      canvas.width = document.getElementById("image").clientWidth;
      canvas.height = document.getElementById("image").clientHeight;

      const ctx = canvas.getContext("2d");
      ctx.filter = this.filters.filter;
      const img = new Image();
      img.src = document.getElementById("image").src;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const resultImage = canvas.toDataURL();
      this.uploadImageOCR(resultImage);
      return resultImage;
    },
    uploadImageOCR(resultImage) {
      const request = {
        image: resultImage
      };
      this.createTransaction(request)
        .then(() => {
          const notification = {
            type: "success",
            message: "Image has been submitted."
          };
          this.addNotification(notification);
        })
        .catch(() => {
          this.setOCRResultType("FUEL");
          const notification = {
            type: "error",
            message:
              "Oops ! You're offline. We will send it back as soon as you're online."
          };
          this.addNotification(notification);
        });
      this.$router.push({ name: "create-transaction-3"});
    }
  }
};
