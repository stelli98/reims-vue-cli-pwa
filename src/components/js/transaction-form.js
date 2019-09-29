import { mapActions, mapGetters } from "vuex";
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
      },
      isLoading: false
    };
  },
  computed: {
    ...mapGetters("transaction", ["OCRResultType"]),
    currentComponent () {
      return this.OCRResultType;
    },
    isSwitchOn () {
      return this.currentComponent ? this.tabs[this.currentComponent].show : "";
    },
    parkingTemplate () {
      return {
        data: {
          category: "PARKING",
          date: "",
          out: "",
          amount: 100,
          title: "",
          parkingType: "",
          license: "",
          location: "",
          hours: 0,
          userId: "",
          image: ""
        }
      };
    },
    fuelTemplate () {
      return {
        data: {
          category: "FUEL",
          date: "",
          fuelType: "",
          liters: 0.01,
          amount: 100,
          title: "",
          userId: "",
          image: ""
        }
      };
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
      this.isSwitchOn ? this.$refs.sendForm.sendParkingForm().then(() => this.emptyAllForm()) : this.$refs.sendForm.sendFuelForm().then(() => this.emptyAllForm())
    },
    emptyAllForm () {
      this.setFormEmpty(this.parkingTemplate);
      this.setFormEmpty(this.fuelTemplate);
      this.$router.push({ name: "home" });
    }
  }
};