import { mapActions } from "vuex";
export default {
  data() {
    return {
      displayMenu: false,
      windowFileReader: new FileReader()
    };
  },
  methods: {
    ...mapActions("transaction", ["setImages", "setImage"]),
    toggleDisplayMenu() {
      this.displayMenu = !this.displayMenu;
      this.$emit("isActionButtonActive", this.displayMenu);
    },
    onOCRFileChange(e, type) {
      const file = URL.createObjectURL(e.target.files[0]);
      this.setImage(file);
      this.$router.push({ name: "create-transaction-1", query: { type } });
    },
    onNonOCRFileChange(e) {
      const fileResult = [];
      Object.values(e.target.files).forEach(image => {
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
};
