import { mapActions, mapState } from "vuex";
import ParkingForm from "@/components/ParkingForm.vue";
import FuelForm from "@/components/FuelForm.vue";

const TOGGLE_BUTTON = {
  true: {
    component: "PARKING",
    action: "sendParkingForm",
    show: true
  },
  false: {
    component: "FUEL",
    action: "sendFuelForm",
    show: false
  }
};

export default {
  components: {
    PARKING: ParkingForm,
    FUEL: FuelForm
  },
  props: {
    pictureUrl: {
      type: String,
      required: true,
      default: ""
    }
  },
  data () {
    return {
      tabs: {
        PARKING: TOGGLE_BUTTON["true"],
        FUEL: TOGGLE_BUTTON["false"]
      }
    };
  },
  computed: {
    ...mapState("transaction", ["parking", "fuel", "OCRResultType"]),
    currentComponent () {
      return this.OCRResultType;
    },
    isSwitchOn () {
      return this.currentComponent
        ? this.tabs[this.currentComponent].show
        : "";
    },
    parkingTemplate () {
      return {
        data: {
          in: "",
          out: "",
          amount: 0,
          title: "",
          vehicle: "",
          license: "",
          location: "",
          category: "PARKING"
        }
      }
    },
    fuelTemplate () {
      return {
        data: {
          date: "",
          type: "",
          volume: 0,
          amount: 0,
          title: "",
          category: "FUEL"
        }
      }
    }
  },
  created () {
    if (!this.pictureUrl) {
      this.$router.push({ name: "create", params: { step: 1 } });
    }
  },
  methods: {
    ...mapActions("transaction", ["setOCRResultType", "setFormEmpty"]),
    toggle () {
      this.setOCRResultType(
        TOGGLE_BUTTON[(!this.isSwitchOn).toString()].component
      );
    },
    saveData () {
      this.$refs.sendForm[
        TOGGLE_BUTTON[this.isSwitchOn.toString()].action.toString()
      ]().then(() => {
        this.setFormEmpty(this.parkingTemplate);
        this.setFormEmpty(this.fuelTemplate);
        this.$router.push({ name: "home" });
        console.log('selesai')
      })
    }
  }
};
