import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Home from "./views/Home.vue";

const defaultRouter: RouteRecordRaw[] = [
    {
        name: "home",
        path: "/",
        component: () => import("./views/Home.vue")
    },
    {
        name: "Photoshop",
        path: "/photoshop",
        component: () => import("./views/Photoshop.vue")
    },
    {
        name: "Illustrator",
        path: "/illustrator",
        component: () => import("./views/Illustrator.vue")
    },
    {
        name: "PremierePro",
        path: "/premierepro",
        component: () => import("./views/PremierePro.vue")
    },
    {
        name: "AfterEffects",
        path: "/aftereffects",
        component: () => import("./views/AfterEffects.vue")
    },
]
export const router = createRouter({history: createWebHashHistory(), routes: defaultRouter})
export default router;