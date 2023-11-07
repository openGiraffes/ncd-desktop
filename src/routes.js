import Home from "./pages/Home.vue";
import Dev from "./pages/Dev.vue";

export default [
    {
        path: "/",
        name: "ncd_home",
        component: Home,
    },
    {
        path: "/dev",
        name: "ncd_dev",
        component: Dev,
    }
];
