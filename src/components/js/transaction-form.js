import { mapGetters } from "vuex";
import ParkingForm from "@/components/ParkingForm.vue";
import FuelForm from "@/components/FuelForm.vue";
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
      return this.$route.query.type.toUpperCase();
    },
    isSwitchOn() {
      return this.currentComponent ? this.tabs[this.currentComponent].show : "";
    },
    isContainingType(){
      return this.$route.query.type  === "fuel" || this.$route.query.type  === "parking"
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
        this.$router.push({ name: "create-transaction-1" , 
        query: {...this.$route.query}});
      }
    },
    checkContainsType(){
      this.isContainingType ? "" : this.$router.push({name: "home"})
    }
  }
};
