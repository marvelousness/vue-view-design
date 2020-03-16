import Vue from "vue";
import App from "./App";
import view from "view-design";
// import "es6-promise/auto";


// 引入系统主题
import "view-design/dist/styles/iview.css";

Vue.config.devtools = true;

Vue.use(view);

new Vue(App).$mount("#app");