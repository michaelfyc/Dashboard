import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import store from './store/index'
import router from "./routes/index";

require('../test/mock');

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
//axios.defaults.baseURL = "http://;localhost:2333/api";
Vue.prototype.axios = axios;

//导航守卫，如果sessionStorage里没有user_id则跳转至登录界面
router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
        sessionStorage.removeItem("dashboard");
    }
    let user = localStorage.getItem("vuex");//TODO try to get it into sessionStorage
    if (!user && to.path !== "/login" && to.path !== "/register") {
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
