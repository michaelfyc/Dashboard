import Login from "../components/Login"
import AboutMe from "../components/panel/AboutMe";
import Home from "../view/Home";
import Welcome from "../view/Welcome";
import Console from "../components/panel/Console";
import Register from "../components/Register";
import NotFound from "../view/404";
import OrderForm from "../components/order/OrderForm";
import Vue from "vue";
import VueRouter from "vue-router";
import OrderTable from "../components/order/OrderTable";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: Welcome,
        name: "Index",
        redirect: "/login",
        children: [
            {
                path: "/login",
                component: Login,
                name: 'login',
                hidden: true
            },
            {
                path: "/register",
                component: Register,
                name: 'Register',
                hidden: true
            }
        ]
    },
    {
        path: "/dashboard",
        component: Home,
        name: "Home",
        redirect: "/dashboard/index",
        children: [
            {
                path: "/dashboard/profile",
                component: AboutMe,
                name: "profile"
            },
            {
                path: "/dashboard/index",
                component: Console,
                name: "console"
            },
            {
                path: "/dashboard/newOrder",
                component: OrderForm,
                name: "newOrder"
            },
            {
                path: "/dashboard/orderList",
                component: OrderTable,
                name: "orderList"
            }
        ]
    },
    {
        path: "/404",
        component: NotFound,
        name: "404 Not Found",
        hidden: true
    },
    //其他自动404
    {
        path: '*',
        hidden: true,
        redirect: {path: "/404"}
    }
];
export default new VueRouter({
    routes
});