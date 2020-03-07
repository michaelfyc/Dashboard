import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import store from './store/index'
import routes from "./routes/index";

require('../test/mock');

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
//axios.defaults.baseURL = "http://;localhost:2333/api";
Vue.prototype.axios = axios;

const router = new VueRouter({
  routes
});

//导航守卫，如果sessionStorage里没有user_id则跳转至登录界面
router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    sessionStorage.removeItem("user_id");
  }
  let user = sessionStorage.getItem("user_id");
  if (!user && to.path !== "/login") {
    next({path: "/login"})
  } else {
    next();
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
