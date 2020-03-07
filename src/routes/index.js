import Login from "../components/Login"
import AboutMe from "../components/panel/AboutMe";
import Home from "../view/Home";
import Welcome from "../view/Welcome";

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
            }
        ]
    },
    {
        path: "/dashboard",
        component: Home,
        name: "Home",
        redirect: "/profile",
        children: [
            {
                path: "/profile",
                component: AboutMe,
                name: "profile"
            }
        ]
    }
];
export default routes;