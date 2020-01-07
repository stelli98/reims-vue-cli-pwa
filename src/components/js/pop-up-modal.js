export default {
  props: {
    isOpen: Boolean,
    title: String,
    content: String,
    type: String
  }, 
  computed: {
    titlePopUpStyle() {
      return this.type
    }
  },
};
