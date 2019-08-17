import axios from 'axios'
import store from '@/store'

function errorResponseHandler (error) {
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
        return Promise.reject(error);
    }

    if (error.response) {
        const notification = {
            type: "error",
            message: `Error! Please try again.${error.response.data.message}`
        };
        store.dispatch("notification/addNotification", notification);
    }
}

axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export default errorResponseHandler;