import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";
import Vuelidate from "vuelidate";
import DateFilter from "./filters/date";
import PriceFilter from "./filters/price";
import TextFilter from "./filters/text";

// require('@mock-api');

Vue.use(Vuelidate);
Vue.use(Croppa, { componentName: "Croppa" });
Vue.filter("dateFormatter", DateFilter);
Vue.filter("priceFormatter", PriceFilter);
Vue.filter("textFormatter", TextFilter);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
