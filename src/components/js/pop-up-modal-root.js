import { ModalBus } from "@/components/js/event-bus.js";
import PopUpModal from "@/components/PopUpModal";

export default {
  components: { PopUpModal },
  data() {
    return {
      component: "",
      title: "",
      props: null,
      closeOnClick: true,
      content: "",
      type: ""
    };
  },
  created() {
    ModalBus.$on(
      "open",
      ({ component, title = "", props = null, closeOnClick = true , content, type}) => {
        this.setUpNewComponent({ component, title, props, closeOnClick, content , type});
      }
    );
  },
  methods: {
    setUpNewComponent({component, title, props, closeOnClick, content,type}) {
      this.component = component;
      this.title = title;
      this.props = props;
      this.closeOnClick = closeOnClick;
      this.content = content;
      this.type = type;
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
