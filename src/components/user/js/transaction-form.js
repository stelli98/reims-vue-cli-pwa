import { mapGetters } from "vuex";
import ParkingForm from "@/components/user/ParkingForm.vue";
import FuelForm from "@/components/user/FuelForm.vue";
import Vue from "vue";
import CommonMixins from "@/mixins/common-mixins";

const TOGGLE_BUTTON = {
  true: {
    component: "PARKING",
    action: "submitParkingForm",
    show: true
  },
  false: {
    component: "FUEL",
    action: "submitFuelForm",
    show: false
  }
};

export default {
  mixins: [CommonMixins],
  components: {
    PARKING: ParkingForm,
    FUEL: FuelForm
  },
  data() {
    return {
      tabs: {
        PARKING: TOGGLE_BUTTON["true"],
        FUEL: TOGGLE_BUTTON["false"]
      },
      isLoading: false,
      bus: new Vue()
    };
  },
  computed: {
    ...mapGetters("transaction", ["image"]),
    currentComponent() {
      return this.$route.query.category;
    },
    isSwitchOn() {
      return this.currentComponent ? this.tabs[this.currentComponent].show : "";
    },
    isContainingType(){
      return this.$route.query.category  === "FUEL" || this.$route.query.category  === "PARKING"
    }
  },
  created() {
    this.checkContainsType();
    this.checkContainsImage();
  },
  methods: {
    submitForm() {
      this.bus.$emit(TOGGLE_BUTTON[this.isSwitchOn.toString()].action);
    },
    checkContainsImage(){
      if (!this.image && this.isContainingType) {
        this.reUploadImage();
      }
    },
    checkContainsType(){
      this.isContainingType ? "" : this.moveTo('home')
    },
    reUploadImage(){
      this.moveToWithQuery("create-transaction-1", {...this.$route.query})
    }
  }
};
