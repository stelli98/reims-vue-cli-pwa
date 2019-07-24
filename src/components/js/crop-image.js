import { mapGetters } from "vuex";
export default {
  name: "App",
  data () {
    return {
      myCroppa: null,
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  methods: {
    generateImage () {
      if (this.myCroppa.hasImage()) {
        return this.myCroppa.generateDataUrl("image/jpg", 0.7);
      }
    },
    flipXImage () {
      this.myCroppa.flipX();
    },
    flipYImage () {
      this.myCroppa.flipY();
    },
    rotateRight () {
      this.myCroppa.rotate(1);
    },
    rotateLeft () {
      this.myCroppa.rotate(-1);
    }
  },
  computed: mapGetters("transaction", ["image"])
};
