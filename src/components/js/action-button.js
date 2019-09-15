import { mapActions } from "vuex";
export default {
  data() {
    return {
      displayMenu: false
    };
  },
  methods: {
    ...mapActions("transaction", ["setImage"]),
    toggleDisplayMenu() {
      this.displayMenu = !this.displayMenu;
      this.$emit("isActionButtonActive", this.displayMenu);
    },
    onFileChange(e) {
      const file = URL.createObjectURL(e.target.files[0]);
      this.setImage(file);
      this.$router.push("/transaction/create/1");
    }
  }
};
