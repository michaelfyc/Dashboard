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
import EditForm from "../components/order/EditForm";
import NewItem from "../components/inventory/NewItem";
import ItemList from "../components/inventory/ItemList";
import ItemGraph from "../components/inventory/ItemGraph";
import FundGraph from "../components/fund/FundGraph";
import FundFlow from "../components/fund/FundFlow";
import NewOrder from "../components/order/NewOrder";

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
                path: "/dashboard/newStorageOrder",
                component: OrderForm,
                name: "newStorageOrder"
            },
            {
                path: "/dashboard/newOrder",
                component: NewOrder,
                name: "newOrder"
            },
            {
                path: "/dashboard/orderList",
                component: OrderTable,
                name: "orderList"
            },
            {
                path: "/dashboard/editOrder",
                component: EditForm,
                name: "editOrder"
            },
            {
                path: "/dashboard/newItem",
                component: NewItem,
                name: "newItem"
            },
            {
                path: "/dashboard/itemList",
                component: ItemList,
                name: "itemList"
            },
            {
                path: "/dashboard/itemGraph",
                component: ItemGraph,
                name: "itemGraph"
            },
            {
                path: "/dashboard/fundGraph",
                component: FundGraph,
                name: "fundGraph"
            },
            {
                path: "/dashboard/flow",
                component: FundFlow,
                name: "flow"
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