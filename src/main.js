import Vue from "vue";
import App from "./App.vue";
import store from "./store";

import VueTimeago from "vue-timeago";

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "ro",
  locales: {
    ro: require("date-fns/locale/ro")
  }
});
