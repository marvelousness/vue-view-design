import Vue from "vue";
import App from "./App";
import view from "view-design";
// import "es6-promise/auto";
import "./mock";

// 引入 iview 样式文件
import "view-design/dist/styles/iview.css";

Vue.config.devtools = true;
Vue.use(view);

new Vue(App).$mount("#app");