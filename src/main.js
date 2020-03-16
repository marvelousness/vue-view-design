// 导入Vue框架
import Vue from "vue";
import App from "./App";
// import "es6-promise/auto";
// import router from "./router";
// import store from "./vuex-store";
// import prototypes from "./prototypes";
// import VueCookies from "huofutp-vue-cookies";

// 引入接口
// import "api";

// 导入前端指令
// import "./client/directive";

// 引入系统主题
// import "view-element-3/dist/styles/iview.css";
// import VE from "view-element-3";

Vue.config.devtools = true;

// Vue.use(prototypes);
// Vue.use(VueCookies);

new Vue(App).$mount("#app");