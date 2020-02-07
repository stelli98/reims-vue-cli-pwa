import { mapActions, mapGetters } from "vuex";
import CommonMixins from "@/mixins/common-mixins";

export default {
  mixins: [CommonMixins],
  data() {
    return {
      myCroppa: null,
      filterFunctions: null,
      width: 0,
      height: 0
    };
  },
  computed: {
    ...mapGetters("transaction", ["image"]),
    isContainingType(){
      return this.$route.query.category  === "FUEL" || this.$route.query.category  === "PARKING"
    }
  },
  methods: {
    ...mapActions("transaction", ["setImage"]),
    generateImage() {
      if (this.myCroppa.hasImage()) {
        return this.myCroppa.generateDataUrl("image/jpg", 0.7);
      }
    },
    flipXImage() {
      this.myCroppa.flipX();
    },
    flipYImage() {
      this.myCroppa.flipY();
    },
    rotateRight() {
      this.myCroppa.rotate(1);
    },
    rotateLeft() {
      this.myCroppa.rotate(-1);
    },
    moveToFilterImage() {
      this.setImage(this.generateImage());
      this.$router.push({ name: "create-transaction-2" , 
      query: {...this.$route.query}});
    },
    checkContainsType(){
      this.isContainingType ? "" : this.$router.push({name: "home"})
    }
  },
  created() {
    this.checkContainsType();
  }
};
