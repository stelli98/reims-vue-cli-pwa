import axios from "axios";
import store from "@/store";

function errorResponseHandler(error) {
  if (error.response) {
    const notification = {
      type: "error",
      message: `Error! Please try again. ${error.response.data.message}`
    };
    store.dispatch("notification/addNotification", notification);
  } else {
    const message = error.message || error.errors || ""
    return Promise.reject(message);
  }
}

axios.interceptors.response.use(response => response, errorResponseHandler);

export default errorResponseHandler;
