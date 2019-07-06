import { mapActions } from "vuex";
export default {
  name: "App",
  props: {
    pictureUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  computed: {
    filters() {
      return this.makeFilter();
    }
  },
  created() {
    if (!this.pictureUrl) {
      this.$router.push({ name: "create", params: { step: 1 } });
    }
    this.filterFunctions = this.defaultValues();
  },
  methods: {
    ...mapActions("transaction", ["createTransaction"]),
    makeFilter(filterSet) {
      if (!filterSet) {
        filterSet = this.filterFunctions;
      }

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
    setToDefault() {
      this.filterFunctions = this.defaultValues();
    },
    defaultValues() {
      return {
        grayscale: 1,
        brightness: 1.1,
        contrast: 1
      };
    },
    changeImage() {
      this.$store.dispatch("setImage", "").then(() => {
        this.$router.push({ name: "crop-image" });
      });
    },
    fillForm() {
      this.$router.push({
        name: "add"
      });
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
      const image = {
        image: resultImage
      };
      this.createTransaction(image);
    }
  }
};
