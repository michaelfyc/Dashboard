import Login from "../components/Login"
import AboutMe from "../components/panel/AboutMe";
import Home from "../view/Home";
import Welcome from "../view/Welcome";
import Console from "../components/panel/Console";
import Register from "../components/Register";
import NotFound from "../view/404";

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
        redirect: "/dashboard/profile",
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
export default routes;