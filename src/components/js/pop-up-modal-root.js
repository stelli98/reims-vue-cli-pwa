import { ModalBus } from "@/components/js/event-bus.js";
import PopUpModal from "@/components/PopUpModal";

export default {
  components: { PopUpModal },
  data() {
    return {
      component: "",
      title: "",
      props: null,
      closeOnClick: true
    };
  },
  created() {
    ModalBus.$on(
      "open",
      ({ component, title = "", props = null, closeOnClick = true }) => {
        this.setUpNewComponent({ component, title, props, closeOnClick });
      }
    );
  },
  methods: {
    setUpNewComponent({component, title, props, closeOnClick}) {
      this.component = component;
      this.title = title;
      this.props = props;
      this.closeOnClick = closeOnClick;
    },
    handleModalClose(force = false) {
      if (!this.closeOnClick && !force) return;
      this.handleClose();
    },
    handleClose() {
      this.component = "";
    }
  }
};
