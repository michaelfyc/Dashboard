import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import store from './store/index'
import router from "./routes/index"
import Cookies from "js-cookie"

require('../test/mock');

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.axios = axios;

//导航守卫，如果sessionStorage里没有user_id则跳转至登录界面
router.beforeEach((to, from, next) => {
    if (to.path === "/login") {
        //免得重新登录，session和cookie各存一份冗余
        sessionStorage.removeItem("user");
    }
    let isLogin = Cookies.get("user");
    if (!isLogin) {
        isLogin = sessionStorage.getItem("user")
    }
    if (!isLogin && to.path !== "/login" && to.path !== "/register") {
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
