const CropImage = () => import("@/components/CropImage.vue");
const FilterImage = () => import("@/components/FilterImage.vue");
const TransactionForm = () => import("@/components/TransactionForm.vue");
import offlineService from "@/api/transaction-offline";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    CropImage,
    FilterImage,
    TransactionForm
  },
  data() {
    return {
      menus: [
        { menuId: 0 },
        {
          menuId: 1,
          menuTitle: "Next",
          menuFunction: "toStepTwo",
          component: "CropImage"
        },
        {
          menuId: 2,
          menuTitle: "Next",
          menuFunction: "toStepThree",
          component: "FilterImage"
        },
        {
          menuId: 3,
          menuTitle: "Save",
          menuFunction: "finalStep",
          component: "TransactionForm"
        }
      ],
      pictureUrl: ""
    };
  },
  computed: {
    ...mapGetters("transaction", ["OCRResultType"]),
    menu() {
      return this.menus[this.activeTab].menuTitle;
    },
    menuAction() {
      return this.menus[this.activeTab].menuFunction;
    },
    activeTab() {
      return this.$route.params.step;
    },
    activeComponent() {
      return this.menus[this.activeTab].component;
    },
    transactionDisabled() {
      return !this.OCRResultType && this.activeTab == 3;
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage", "setOCRResultType"]),
    menuFunctionAction(function_name) {
      this[function_name]();
    },
    toStepOne() {
      if (this.activeTab == 3) {
        this.deleteDataFromIDB();
      }
      this.$router.push({ name: "create", params: { step: 1 } });
    },
    toStepTwo() {
      if (this.activeTab == 1) {
        this.fromStepOne();
      } else if (this.activeTab == 3) {
        this.fromStepThree();
      }
    },
    fromStepOne() {
      this.pictureUrl = this.$refs.generate.generateImage();
      this.setImage(this.pictureUrl);
      if (this.pictureUrl) {
        this.$router.push({ name: "create", params: { step: 2 } });
      }
    },
    fromStepThree() {
      this.deleteDataFromIDB();
      this.$router.push({ name: "create", params: { step: 2 } });
    },
    toStepThree() {
      if (this.isSamePage("3")) {
        return;
      } else if (this.pictureUrl) {
        this.pictureUrl = this.$refs.generate.generateImage();
      } else {
        this.$router.push({ name: "create", params: { step: 1 } });
      }
    },
    finalStep() {
      this.$refs.generate.saveData();
      this.setOCRResultType("");
    },
    isSamePage(clickedTab) {
      return this.activeTab == clickedTab;
    },
    moveTo() {
      this.deleteDataFromIDB();
      this.$router.push({ name: "home" });
    },
    deleteDataFromIDB() {
      try {
        offlineService.deleteLastDataFromIndexedDB("offlineImages");
      } catch (e) {
        return e;
      }
    }
  },
  watch: {
    $route() {
      if (
        !this.$route.path.includes("/transaction/create/") &&
        this.activeTab == 3
      ) {
        this.deleteDataFromIDB();
      }
    }
  }
};
