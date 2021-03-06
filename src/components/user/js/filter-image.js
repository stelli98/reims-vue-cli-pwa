import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      filterFunctions: null,
      width: 0,
      height: 0,
      isScanOCR: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["image"]),
    filters() {
      return this.makeFilter();
    },
    isContainingType() {
      return (
        this.$route.query.category === "FUEL" ||
        this.$route.query.category === "PARKING"
      );
    }
  },
  created() {
    this.checkContainsType();
    this.checkContainsImage();
    this.setFilterToDefault();
  },
  methods: {
    ...mapActions("transaction", ["createTransaction", "setImage"]),
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
    setFilterToDefault() {
      this.filterFunctions = this.defaultValues();
    },
    filterImage() {
      this.setImage(this.generateImage());
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
        attachments: [resultImage],
        category: this.$route.query.category
      };
      this.isScanOCR = true;
      this.createTransaction(request)
        .then(() => {
          this.uploadImageOCRFinish("success", "Image has been submitted.");
        })
        .catch(() => {
          this.uploadImageOCRFinish(
            "error",
            "Oops ! You're offline. We will send it back as soon as you're online."
          );
        });
    },
    checkContainsImage() {
      if (!this.image && this.isContainingType) {
        this.$router.push({
          name: "create-transaction-1",
          query: { ...this.$route.query }
        });
      }
    },
    checkContainsType() {
      this.isContainingType ? "" : this.$router.push({ name: "home" });
    },
    uploadImageOCRFinish(type, message) {
      this.isScanOCR = false;
      const notification = {
        type,
        message
      };
      this.addNotification(notification);
      this.$router.push({
        name: "create-transaction-3",
        query: { ...this.$route.query }
      });
    }
  }
};
