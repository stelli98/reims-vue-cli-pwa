import { mapActions, mapGetters } from "vuex";
import ParkingForm from "@/components/ParkingForm.vue";
import FuelForm from "@/components/FuelForm.vue";
import Vue from 'vue'

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
  components: {
    PARKING: ParkingForm,
    FUEL: FuelForm
  },
  data () {
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
    ...mapGetters("transaction", ["OCRResultType"]),
    ...mapGetters("transaction", ["image"]),
    currentComponent () {
      return this.OCRResultType;
    },
    isSwitchOn () {
      return this.currentComponent ? this.tabs[this.currentComponent].show : "";
    }
  },
  created () {
    this.checkContainsImage()
  },
  methods: {
    ...mapActions("transaction", ["setOCRResultType", "setFormEmpty"]),
    toggle () {
      this.setOCRResultType(
        TOGGLE_BUTTON[(!this.isSwitchOn).toString()].component
      );
    },
    submitForm(){
      this.bus.$emit(
        TOGGLE_BUTTON[(this.isSwitchOn).toString()].action)
    },
    checkContainsImage(){
      if (!this.image) {
        this.moveTo()
      }
    }, 
    moveTo(){
      this.$router.push({ name: "create-transaction-1" });
    }
  }
};